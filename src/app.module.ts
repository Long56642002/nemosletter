import { Module } from '@nestjs/common';
import { GoogleModule } from './google/google.module';
import { EmailModule } from './email/email.module';
import { UserModule } from './user/user.module';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { BullModule } from '@nestjs/bull';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true
  }),
  BullModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      redis: {
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT')
      }
    }),
    inject: [ConfigService]
  }),
  MailerModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      transport: {
        host: configService.get('MAILER_HOST'),
        secure: true,
        auth: {
          user: configService.get('MAILER_USER'),
          pass: configService.get('MAILER_PASS')
        }
      }
    }),
    inject: [ConfigService]
  })
  , GoogleModule, EmailModule, UserModule, PassportModule.register({ session: true }), PrismaModule, AuthModule],
})
export class AppModule {}
