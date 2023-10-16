import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  sub: string

  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  picture?: string

  @IsString()
  @IsOptional()
  userType?: string
}