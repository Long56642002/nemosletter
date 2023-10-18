import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailOptions } from './email_options.type';
import { JwtGuard } from 'src/auth/jwt.guard';

@UseGuards(JwtGuard)
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get('get-email-info')
  async getEmailInfo(@Req() req) {
    const result = await this.emailService.getEmailInformation(req)
    return result
  }

  @Get('list')
  async getEmailList(@Req() req) {
    var result = await this.emailService.getEmailList(req)
    return result
  }

  @Get('send-email')
  async sendEmail(@Req() req) {
    const emailOptions: EmailOptions = req.body.email_options
    const result = await this.emailService.sendEmail(req, emailOptions)
    return result
  }
}
