import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser({data}: { data: CreateUserDto }): Promise<User> {
    try {
      const user = await this.prismaService.user.create({
        data: {
          ...data
        }
      })
  
      return user
    } catch (e: any) {
      throw new InternalServerErrorException(e)
    }
  }

  async findUserByEmailOrSub({ email, sub }: { email: string, sub: string }): Promise<User | null> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          email,
          sub
        }
      })
      
      return user;
    } catch (e: any) {
      throw new InternalServerErrorException(e)
    }
  }

  async getAllUsers(): Promise<User[] | undefined> {
    try {
      const users = await this.prismaService.user.findMany()
      return users
    } catch (e: any) {
      throw new InternalServerErrorException(e)
    }
  }

}
