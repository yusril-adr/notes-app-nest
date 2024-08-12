import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import dayjs from '@helpers/utils/dayjs';

export class Note {
  @ApiProperty({
    example: 'c98c19de-c116-4f3a-913d-da98a8e449fa',
    description: 'The id for note',
  })
  id: string;

  @ApiProperty({
    example: 'p0ZoB1FwH6',
    description: 'The short id for note',
  })
  short_id: string;

  @Optional()
  @ApiProperty({
    example: 'c98c19de-c116-4f3a-913d-da98a8e449fa',
    description: 'User that create note',
  })
  user_id?: string;

  @ApiProperty({
    example: 'This is Header Note',
    description: 'Header of the Note',
  })
  header: string;

  @ApiProperty({
    example: 'This is the Body in Note',
    description: 'Body of the note',
  })
  body: string;

  @ApiProperty({
    example: true,
    description: 'Is note publicaly visible',
  })
  is_public: boolean;

  @ApiProperty({
    example: dayjs.utc().toISOString(),
    description: 'The date note created',
    default: dayjs.utc().toISOString(),
  })
  created_at: string;

  @Optional()
  @ApiProperty({
    description: 'User detail that owns note',
  })
  user?: {
    id: string;
    username: string;
    profile_img: string;
  };
}
