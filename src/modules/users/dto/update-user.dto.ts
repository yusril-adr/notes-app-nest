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

  @IsUrl()
  @IsNotEmpty()
  @IsOptional()
  profile_img: string;
}
