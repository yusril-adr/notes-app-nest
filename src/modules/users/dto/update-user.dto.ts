import { Transform } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsEmail,
  IsUrl,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email: string;

  @Transform(({ value }) => (value === 'null' ? null : value))
  @IsUrl()
  @IsNotEmpty()
  @IsOptional()
  profile_img: string | null;
}
