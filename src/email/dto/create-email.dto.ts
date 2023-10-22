import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateEmailDto {
  @IsString()
  @IsNotEmpty()
  subject: string

  @IsString()
  @IsNotEmpty()
  text: string

  @IsArray()
  @IsNotEmpty()
  sentEmails: string[]
}