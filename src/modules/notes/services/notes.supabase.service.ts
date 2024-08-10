import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SupabaseProvider } from '@components/supabase/supabase.provider';
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@global/types/supabase-types';
import dayjs from '@helpers/utils/dayjs';

import { NotesService } from '../notes.service';
import { Note } from '../entities/note.entity';
import {
  CreateParams,
  FindAllParams,
  FindAllResponse,
  FindOneParams,
  UpdateParams,
} from '../types/notes.service';

@Injectable()
export class NotesSupabaseService extends NotesService {
  private readonly supabase: SupabaseClient<Database>;
  constructor(private readonly supabaseProvider: SupabaseProvider) {
    super();
    this.supabase = this.supabaseProvider.init();
  }

  async create(createParams: CreateParams): Promise<Note> {
    const { data, error, status, statusText } = await this.supabase
      .from('notes')
      .insert(createParams)
      .select('id, short_id, user_id, header, body, is_public, created_at')
      .limit(1)
      .single();

    console.log({ status, statusText, scope: 'create note' });

    if (error) {
      throw new BadRequestException(error.message);
    }

    return data;
  }

  async findAll(findAllParams: FindAllParams): Promise<FindAllResponse> {
    const { row, page, filter, search } = findAllParams;
    const offset = row * page - row;
    let query = this.supabase
      .from('notes')
      .select(
        'id, short_id, header, body, is_public, created_at, user:users(id, username, profile_img)',
        { count: 'exact' },
      );

    if (filter) {
      const keys = Object.keys(filter);

      const filterQuery = keys.map((key) => {
        return `${key}.eq.${filter[key]}`;
      });

      query = query.or(filterQuery.join(','));
    }

    if (search) {
      const keys = Object.keys(search);

      keys.forEach((key) => {
        query = query.ilike(key, `%${search[key]}%`);
      });
    }

    const { data, error, count, status, statusText } = await query.range(
      offset,
      offset + (row - 1),
    );

    console.log({
      status,
      statusText,
      scope: 'find all users',
    });

    if (error) {
      throw new BadRequestException(error.message);
    }

    return { data, count: count };
  }

  async findOne(findOneParams: FindOneParams): Promise<Note> {
    const keys = Object.keys(findOneParams);

    const query = keys.map((key) => {
      return `${key}.eq.${findOneParams[key]}`;
    });

    const { data, error, status, statusText } = await this.supabase
      .from('notes')
      .select(
        'id, short_id, header, body, is_public, created_at, user:users(id, username, profile_img)',
      )
      .or(query.join(','))
      .limit(1)
      .single();

    console.log({
      status,
      statusText,
      scope: 'find one user',
    });

    if (error?.code === 'PGRST116') {
      return null;
    }

    if (error) {
      throw new BadRequestException(error.message);
    }

    return data;
  }

  async updateByShortId(
    short_id: string,
    updateParams: UpdateParams,
  ): Promise<Note> {
    const { data, error, status, statusText } = await this.supabase
      .from('notes')
      .update({
        ...updateParams,
        updated_at: dayjs.utc().toISOString(),
      })
      .eq('short_id', short_id)
      .select('id, short_id, user_id, header, body, is_public, created_at')
      .single();

    console.log({
      status,
      statusText,
      scope: 'update note by short id',
    });

    if (error?.code === 'PGRST116') {
      throw new NotFoundException('Note not found');
    }

    if (error) {
      throw new BadRequestException(error.message);
    }

    return data;
  }

  async removeByShortId(short_id: string): Promise<void> {
    const { error, status, statusText } = await this.supabase
      .from('notes')
      .delete()
      .eq('short_id', short_id);

    console.log({
      status,
      statusText,
      scope: 'delete one note by short id',
    });

    if (error?.code === 'PGRST116') {
      throw new NotFoundException('Note not found');
    }

    if (error) {
      throw new BadRequestException(error.message);
    }
  }
}
