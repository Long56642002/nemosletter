import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy, VerifyCallback } from "passport-google-oauth20";
import { config } from 'dotenv';

config();

@Injectable()
export class GoogleStategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    })
  }

  async validate (accessToken: string, refreshToken: string, profile: Profile): Promise<any> {
    const { name, email, picture, sub } = profile._json
    const user = {
      name,
      email,
      picture,
      sub
    }

    return user;
  }
}