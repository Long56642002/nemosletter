import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class GoogleService {
  constructor(private prisma: PrismaService) {
    
  }
  async googleLogin(req) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: req.user.email,
        sub: req.user.sub,
        name: req.user.name
      }
    })
    if(user) return user;

    const createUser = await this.prisma.user.create({
      data: {
        ...req.user
      }
    })
    return createUser;
  }

  async findUser(user) {
    const result = await this.prisma.user.findFirst({
      where: {
        email: user.email,
        sub: user.sub,
        name: user.name,
      }
    })

    return result;
  }

  async createUser(user) {
    const returnedUser = await this.prisma.user.create({
      data: {
        ...user,
      }
    })
    return returnedUser;
  }
}