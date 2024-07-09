import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ example: 'p0ZoB1FwH6', description: 'The id for users' })
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
