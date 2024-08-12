import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { SupabaseProvider } from '@components/supabase/supabase.provider';
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@global/types/supabase-type';
import { UsersService } from '@modules/users/users.service';
import {
  FindAllUsersResponse,
  FindUserParams,
  UpdateUserParams,
} from '@modules/users/types/users.service';
import { User } from '@modules/users/entities/user.entity';
import dayjs from '@helpers/utils/dayjs';

@Injectable()
export class UsersSupabaseService extends UsersService {
  private readonly supabase: SupabaseClient<Database>;
  private readonly logger = new Logger(UsersSupabaseService.name);
  constructor(private readonly supabaseProvider: SupabaseProvider) {
    super();
    this.supabase = this.supabaseProvider.init();
  }

  async findAll(findUserParams: FindUserParams): Promise<FindAllUsersResponse> {
    const { row, page, filter, search } = findUserParams;
    const offset = row * page - row;
    let query = this.supabase
      .from('users')
      .select('id, username, email, profile_img', { count: 'exact' });

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

    this.logger.log({
      status,
      statusText,
      scope: 'find all users',
    });

    if (error) {
      throw new BadRequestException(error.message);
    }

    return { data, count: count };
  }

  async findOne(id: string): Promise<User> {
    const { data, error, status, statusText } = await this.supabase
      .from('users')
      .select('id, username, email, profile_img')
      .eq('id', id)
      .limit(1)
      .single();

    this.logger.log({
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

  async update(id: string, updateUserParams: UpdateUserParams): Promise<User> {
    const { data, error, status, statusText } = await this.supabase
      .from('users')
      .update({
        ...updateUserParams,
        updated_at: dayjs.utc().toISOString(),
      })
      .eq('id', id)
      .select('id, username, email, profile_img')
      .single();

    this.logger.log({
      status,
      statusText,
      scope: 'update user',
    });

    if (error?.code === 'PGRST116') {
      throw new NotFoundException('User not found');
    }

    if (error) {
      throw new BadRequestException(error.message);
    }

    return data;
  }

  async remove(id: string): Promise<void> {
    const { error, status, statusText } = await this.supabase
      .from('users')
      .delete()
      .eq('id', id);

    this.logger.log({
      status,
      statusText,
      scope: 'delete one user',
    });

    if (error?.code === 'PGRST116') {
      throw new NotFoundException('User not found');
    }

    if (error) {
      throw new BadRequestException(error.message);
    }
  }
}
