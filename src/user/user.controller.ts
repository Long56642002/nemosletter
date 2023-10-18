import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { GoogleGuard } from 'src/google/google.guard';
import { UserDecorator } from 'src/common/decorators/user.decorator';
import { User } from '@prisma/client';
import { JwtGuard } from 'src/auth/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(JwtGuard)
  getInformation(@UserDecorator() user: User) {
    return user
  }
}
