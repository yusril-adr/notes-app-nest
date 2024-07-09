import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

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
  password: string;
}
