import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { googleMail, oAuth2Client } from 'src/constant';
import { EmailOptions } from './types/email-options.type';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailGoogleService {
  constructor(readonly configService: ConfigService, private readonly mailerService: MailerService) {
    // oAuth2Client.setCredentials({ refresh_token: configService.get('REFRESH_TOKEN'), expiry_date: (new Date()).getTime() + (1000 * 60 * 60 * 24 * 7) })
  }

  async getEmailInformation(email: string) {
    try {
      const gmailInformation = await googleMail.users.getProfile({ auth: oAuth2Client, userId: email })
      return gmailInformation.data
    } catch (e: any) {
      throw new InternalServerErrorException(e)
    }
  }

  async getEmailList(email: string) {
    try {
      const threads = googleMail.users.threads
      const gmailList = await threads.list({ auth: oAuth2Client, userId: email })
      return  gmailList.data
    } catch (e: any) {
      throw new InternalServerErrorException(e)
    }
  }

  async sendEmail(email: string, emailOption: EmailOptions) {
    try {
      const result = await this.mailerService.sendMail({...emailOption, from: email })

      return result
    } catch (e: any) {
      throw new InternalServerErrorException(e)
    }
  }

  async getEmailById(email: string, emailId: string) {
    try {
      const gmail = await googleMail.users.messages.get({ auth: oAuth2Client, userId: email, id: emailId })
      return gmail.data
    } catch (e: any) {
      throw new InternalServerErrorException()
    }
  }
}
