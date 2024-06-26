import { IsString, MaxLength, MinLength } from 'class-validator';
import { Match } from '@global/decorators/match.decorator';
import { VerifyForgotPassDto } from './verify-forgot-password.dto';

export class ConfirmForgotPassDto extends VerifyForgotPassDto {
  @IsString()
  token: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  new_password: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Match('new_password')
  confirm_new_password: string;
}
