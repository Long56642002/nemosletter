import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { JwtGuard } from './jwt.guard';
import { AuthService } from './auth.service';
import { GoogleLoginDto } from './dto/google-login.dto';
import { AuthUser } from './dto/auth-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  async login(@Query() googleLoginDto: GoogleLoginDto): Promise<AuthUser> {
    return await this.authService.googleLogin(googleLoginDto)
  }
}
