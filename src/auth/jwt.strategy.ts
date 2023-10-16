import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { IJwt } from "./interfaces/jwt.interface";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    readonly configService: ConfigService,
    private readonly prismaService: PrismaService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('SECURITY')
    })
  }

  async validate(payload: IJwt): Promise<User> {
    const user: any = await this.prismaService.user.findFirst({
      where: {
        sub: payload.sub 
      }
    })

    if(user==null) throw new UnauthorizedException()

    return user
  }
}