import { Type } from 'class-transformer';
import {
  IsString,
  Min,
  IsNumber,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
export class FindUsersDto {
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  @IsOptional()
  @Min(1)
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
}
