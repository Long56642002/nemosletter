import { BadRequestException, HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { GoogleLoginDto } from './dto/google-login.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateToken } from './interfaces/create-token.interface';
import { AuthUser } from './dto/auth-user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private client: OAuth2Client
  constructor(
    private configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {
    this.client = new OAuth2Client();
  }

  async verifyToken(gIdToken: string): Promise<TokenPayload | undefined> {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken: gIdToken,
        audience: this.configService.get('GOOGLE_CLIENT_ID')
      })
  
      const payload = ticket.getPayload()
  
      return payload
    } catch (e: any) {
      throw new InternalServerErrorException('Unexpected error')
    }
  }

  async googleLogin({ gIdToken }: GoogleLoginDto): Promise<AuthUser> {
    try {
      const googleAccount = await this.verifyToken(gIdToken)
      if (googleAccount === undefined) {
        throw new BadRequestException(
          'Can not create account with your google credentials',
        )
      }

      const { email, sub, name, picture } = googleAccount

      var user = await this.userService.findUserByEmailOrSub({email, sub})

      if (user === null) {
        user = await this.userService.createUser({
          data: {
            email,
            sub,
            name,
            picture
          }
        })
      }

      const accessToken = this.generateToken({ sub: user.sub })

      return {
        user,
        accessToken
      }
    } catch (e: any) {
      if (e instanceof HttpException) {
        throw e
      }

      throw new InternalServerErrorException('Unexpected error')
    }
  }

  generateToken(payload: CreateToken): string {
    try {
      const accessToken = this.jwtService.sign(payload, {secret: this.configService.get('SECURITY')})

      return accessToken
    } catch (e: any) {
      console.log(e)
      throw new InternalServerErrorException()
    }
  }
}
