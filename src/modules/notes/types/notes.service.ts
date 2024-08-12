import { FilterQueryType } from '@global/types/filter-type';
import { Note } from '../entities/note.entity';

export type CreateParams = {
  short_id: string;
  header: string;
  body: string;
  user_id: string;
};

export type FindOneParams = Record<string, any>;

export type FindAllParams = {
  row: number | 10;
  page: number | 1;
  filter?:
    | undefined
    | null
    | {
        [key in keyof Note]?: FilterQueryType<Note[key]>;
      };
  search?: undefined | null | Record<string, any>;
};

export type FindAllResponse = {
  data: Note[];
  count: number;
};

export type UpdateParams = {
  header: string;
  body: string;
};
