import { Body, Controller, Get, Param, UseGuards } from '@nestjs/common';
import { EmailGoogleService } from './email-google.service';
import { EmailOptions } from './types/email-options.type';
import { JwtGuard } from 'src/auth/jwt.guard';
import { UserDecorator } from 'src/common/decorators/user.decorator';
import { EmailService } from './email.service';
import { User } from '@prisma/client';
import { CreateEmailDto } from './dto/create-email.dto';

@UseGuards(JwtGuard)
@Controller('email')
export class EmailController {
  constructor(
    private readonly emailGoogleService: EmailGoogleService,
    private readonly emailService: EmailService
  ) {}

  @Get('google/get-email-info')
  async getEmailInfo(@UserDecorator('email') email: string) {
    const result = await this.emailGoogleService.getEmailInformation(email)
    return result
  }

  @Get('google/list')
  async getEmailList(@UserDecorator('email') email: string) {
    const result = await this.emailGoogleService.getEmailList(email)
    return result
  }

  @Get('google/send-email')
  async sendEmail(@Body() emailOptions: EmailOptions, @UserDecorator('email') email: string) {
    const result = await this.emailGoogleService.sendEmail(email, emailOptions)
    return result
  }

  @Get('google/:id')
  async getEmailById(@UserDecorator('email') email: string, @Param('id') emailId: string) {
    const result = await this.emailGoogleService.getEmailById(email, emailId)
    return result
  }

  @Get('send-email')
  async processSendEmail(@UserDecorator() user: User, @Body() emailData: CreateEmailDto) {
    return this.emailService.processSendMail({user, emailData})
  }
}
