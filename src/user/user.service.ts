import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  getInformation(req) {
    return req.user
  }

  async createUser({data}: { data: CreateUserDto }): Promise<User> {
    const user = await this.prismaService.user.create({
      data: {
        ...data
      }
    })

    return user
  }

  async findUserByEmailOrSub({ email, sub }: { email: string, sub: string }): Promise<User | null> {
    const user = this.prismaService.user.findUnique({
      where: {
        email,
        sub
      }
    })
    
    return user;
  }
}
