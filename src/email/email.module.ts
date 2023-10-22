import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { EmailGoogleService } from './email-google.service';
import { BullModule } from '@nestjs/bull';
import { PROCESS_SEND_MAIL } from 'src/constant';
import { ProcessSendMailConsumer } from './process-send-mail.consumer';

@Module({
  imports: [
    BullModule.registerQueue({
      name: PROCESS_SEND_MAIL
    })
  ],
  controllers: [EmailController],
  providers: [EmailService, EmailGoogleService, ProcessSendMailConsumer]
})
export class EmailModule {}
