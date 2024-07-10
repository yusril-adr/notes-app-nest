import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({
    example: 'c98c19de-c116-4f3a-913d-da98a8e449fa',
    description: 'The id for users',
  })
  id: string;

  @ApiProperty({ example: 'username', description: 'Username of the users' })
  username: undefined | null | string;

  @ApiProperty({
    example: 'email',
    description: 'Email of the users',
  })
  email: string;

  @Optional()
  @ApiProperty({
    example: 'profile_img',
    description: 'Password of the users',
  })
  profile_img: string;
}
