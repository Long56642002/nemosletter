import { Body, Controller, Get, Param, UseGuards } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailOptions } from './email_options.type';
import { JwtGuard } from 'src/auth/jwt.guard';
import { UserDecorator } from 'src/common/decorators/user.decorator';

@UseGuards(JwtGuard)
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get('get-email-info')
  async getEmailInfo(@UserDecorator('email') email: string) {
    const result = await this.emailService.getEmailInformation(email)
    return result
  }

  @Get('list')
  async getEmailList(@UserDecorator('email') email: string) {
    const result = await this.emailService.getEmailList(email)
    return result
  }

  @Get('send-email')
  async sendEmail(@Body() emailOptions: EmailOptions, @UserDecorator('email') email: string) {
    const result = await this.emailService.sendEmail(email, emailOptions)
    return result
  }

  @Get(':id')
  async getEmailById(@UserDecorator('email') email: string, @Param('id') emailId: string) {
    const result = await this.emailService.getEmailById(email, emailId)
    return result
  }
}
