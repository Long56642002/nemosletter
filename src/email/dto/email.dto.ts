import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class EmailDto {
  @IsString()
  @IsNotEmpty()
  subject: string

  @IsString()
  @IsNotEmpty()
  text: string

  @IsArray()
  @IsNotEmpty()
  sentEmail: string[]
}