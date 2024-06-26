import { Match } from '@global/decorators/match.decorator';
import {
  IsString,
  IsEmail,
  MaxLength,
  MinLength,
  IsOptional,
} from 'class-validator';

export class RegisterAuthDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Match('password')
  confirm_password: string;
}
