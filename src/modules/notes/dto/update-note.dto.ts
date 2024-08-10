import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { CreateNoteDto } from './create-note.dto';

export class UpdateNoteDto extends PartialType(CreateNoteDto) {
  @IsString()
  @IsNotEmpty()
  header: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  @Transform(({ value }) => (value === 'true' ? true : false))
  @IsNotEmpty()
  @IsOptional()
  is_public: boolean = true;
}
