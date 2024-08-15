import { Transform, Type } from 'class-transformer';
import {
  IsString,
  Min,
  IsNumber,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import { FilterQueryType } from '@global/types/filter-type';
import { Note } from '../entities/note.entity';
import { transformFilterDto } from '@helpers/utils/common';

export class FindNoteDto {
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  @IsOptional()
  @Min(10)
  row: number = 10;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  @Min(1)
  page: number = 1;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  search_value: string = null;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  search_key: string = null;

  @Transform(transformFilterDto)
  @IsOptional()
  filter: {
    [key in keyof Note]?: FilterQueryType<Note[key]>;
  };
}
