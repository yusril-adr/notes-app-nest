import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class LoginAuthDto {
  @ApiProperty({
    description: 'Username or Email of User',
    example: 'user@mail.com',
    examples: ['user-1', 'user@mail.com'],
  })
  @IsString()
  identifier: string;

  @ApiProperty({
    description: 'Password of User',
    example: 'supersecretpassword',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
