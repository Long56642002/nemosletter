import { Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job } from "bull";
import { PROCESS_SEND_MAIL } from "src/constant";
import { EmailService } from "./email.service";
import { EmailGoogleService } from "./email-google.service";
import { User } from "@prisma/client";
import { CreateEmailDto } from "./dto/create-email.dto";

@Processor(PROCESS_SEND_MAIL)
export class ProcessSendMailConsumer {
  private readonly logger = new Logger(ProcessSendMailConsumer.name)

  constructor(
    private readonly emailService: EmailService,
    private readonly emailGoogleService: EmailGoogleService
  ) {}

  @Process()
  async processSendMail(job: Job<{user: User, emailData: CreateEmailDto}|any>) {
    this.logger.log("Start to process sending email")
    const { user, emailData } = job.data
    const mail = await this.emailService.createEmailService({user, data: emailData})

    if (mail) {
      this.logger.debug(mail)
      const promiseTasks = mail.sentEmails.map((sentEmail)=> {
        this.emailGoogleService.sendEmail(user.email, { to: sentEmail, subject: emailData.subject, text: emailData.text })
      })
      await Promise.all(promiseTasks)
    }
    this.logger.log("Sending success")
  }
}