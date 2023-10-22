import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Mail, User } from "@prisma/client";
import { CreateEmailDto } from "./dto/create-email.dto";
import { PROCESS_SEND_MAIL } from "src/constant";
import { Queue } from "bull";
import { InjectQueue } from "@nestjs/bull";

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name)
  constructor(
    private readonly prismaService: PrismaService,
    @InjectQueue(PROCESS_SEND_MAIL) private readonly processSendMailQueue: Queue
    ) {}

  async createEmailService({user, data}: {user: User, data: CreateEmailDto}):  Promise<Mail | undefined> {
    try {
      const email = await this.prismaService.mail.create({
        data: {
          ...data,
          userId: user.id
        }
      })

      return email
    } catch (e: any) {
      throw new InternalServerErrorException(e)
    }
  }

  async processSendMail({user, emailData}: {user: User, emailData: CreateEmailDto}) {
    await this.processSendMailQueue.add({
      user,
      emailData
    })
  }
}