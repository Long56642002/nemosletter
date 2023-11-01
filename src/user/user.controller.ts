import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { GoogleGuard } from 'src/google/google.guard';
import { UserDecorator } from '../common/decorators/user.decorator';
import { User } from '@prisma/client';
import { JwtGuard } from '../auth/jwt.guard';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  getInformation(@UserDecorator() user: User) {
    return user
  }

  @Get()
  async getAllUsers(): Promise<User[] | undefined> {
    const users = await this.userService.getAllUsers()

    return users
  }

  @Post()
  async createUser(@UserDecorator() user: User, @Body() createUserDto: CreateUserDto): Promise<User | undefined> {
    const createdUser = await this.userService.createUser({ data: createUserDto })
    return createdUser
  }
}
