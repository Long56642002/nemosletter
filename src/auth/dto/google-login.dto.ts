import { IsNotEmpty, IsString } from "class-validator";

export class GoogleLoginDto {
  @IsNotEmpty()
  @IsString()
  gIdToken: string
}