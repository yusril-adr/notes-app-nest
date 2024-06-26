import { IsEmail, IsString } from 'class-validator';

export class VerifyForgotPassDto {
  @IsEmail()
  email: string;

  @IsString()
  token: string;
}
