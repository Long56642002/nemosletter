import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import * as session from 'express-session';
import * as passport from 'passport';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors:  true });
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 365*24*60000
      },
    }),
  );
  app.use(passport.initialize())
  app.use(passport.session())
  await app.listen(process.env.PORT);
}
bootstrap();
