import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @IsNotEmpty()
  header: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  @Transform(({ value }) => value === 'true')
  @IsNotEmpty()
  @IsOptional()
  is_public: boolean = true;
}
