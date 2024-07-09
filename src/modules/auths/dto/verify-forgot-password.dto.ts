import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class VerifyForgotPassDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}
