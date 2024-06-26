import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { SupabaseProvider } from '@components/supabase/supabase.provider';
import { SupabaseClient } from '@supabase/supabase-js';

import { AuthsService } from '../auths.service';
import {
  FindOneParams,
  RegisterServiceParams,
  SaveForgotTokenParams,
  VerifyForgotTokenParams,
  VerifyForgotTokenResult,
} from '../types/auths.service';
import { Database } from '@global/types/supabase-types';
import { Auth } from '../entities/auth.entity';

@Injectable()
export class AuthsSupabaseService extends AuthsService {
  private readonly supabase: SupabaseClient<Database>;
  constructor(private readonly supabaseProvider: SupabaseProvider) {
    super();
    this.supabase = this.supabaseProvider.init();
  }

  async register(registerServiceParams: RegisterServiceParams): Promise<Auth> {
    const { data, error, status, statusText } = await this.supabase
      .from('users')
      .insert(registerServiceParams)
      .select('id, email, username, password, profile_img')
      .limit(1)
      .single();

    console.log({ status, statusText, scope: 'register user' });

    if (error?.code === '23505') {
      throw new ConflictException(error.message);
    }

    if (error) {
      throw new BadRequestException(error.message);
    }

    return data;
  }

  async findOne(findOneParams: FindOneParams): Promise<Auth | null> {
    const keys = Object.keys(findOneParams);

    const query = keys.map((key) => {
      return `${key}.eq.${findOneParams[key]}`;
    });

    const { data, error, status, statusText } = await this.supabase
      .from('users')
      .select('id, email, username, password, profile_img')
      .or(query.join(','))
      .limit(1)
      .single();

    console.log({
      status,
      statusText,
      scope: 'find one auth',
    });

    // Data not found
    if (error?.code === 'PGRST116') {
      return null;
    }

    if (error) {
      throw new BadRequestException(error.message);
    }

    return data;
  }

  async saveRefreshToken(token: string): Promise<void> {
    const { error, status, statusText } = await this.supabase
      .from('refresh_tokens')
      .insert({ token });

    console.log({ status, statusText, scope: 'saving refresh token' });

    if (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findRefreshToken(token: string): Promise<string | null> {
    const { data, error, status, statusText } = await this.supabase
      .from('refresh_tokens')
      .select('token')
      .eq('token', token)
      .limit(1)
      .single();

    console.log({
      status,
      statusText,
      scope: 'find one auth',
    });

    // Data not found
    if (error?.code === 'PGRST116') {
      return null;
    }

    if (error) {
      throw new BadRequestException(error.message);
    }

    return data.token;
  }

  async deleteRefreshToken(token: string): Promise<void> {
    const { error, status, statusText } = await this.supabase
      .from('refresh_tokens')
      .delete()
      .eq('token', token);

    console.log({
      status,
      statusText,
      scope: 'delete refresh token',
    });

    // Data not found
    if (error?.code === 'PGRST116') {
      console.log({
        params: { token },
        status,
        statusText,
        scope: 'delete refresh token',
        error: error,
      });
    }

    if (error) {
      throw new BadRequestException(error.message);
    }
  }

  async saveForgotToken(saveForgotToken: SaveForgotTokenParams): Promise<void> {
    const { error, status, statusText } = await this.supabase
      .from('forgot_password_tokens')
      .insert(saveForgotToken);

    console.log({ status, statusText, scope: 'saving forgot password token' });

    if (error) {
      throw new BadRequestException(error.message);
    }
  }

  async verifyForgotToken(
    verifyForgotTokenParams: VerifyForgotTokenParams,
  ): Promise<VerifyForgotTokenResult> {
    const { user_id, token } = verifyForgotTokenParams;
    const { data, error, status, statusText } = await this.supabase
      .from('forgot_password_tokens')
      .select('user_id, token, created_at')
      .eq('user_id', user_id)
      .eq('token', token)
      .limit(1)
      .single();

    console.log({
      status,
      statusText,
      scope: 'verify forgot password token',
    });

    // Data not found
    if (error?.code === 'PGRST116') {
      return null;
    }

    if (error) {
      throw new BadRequestException(error.message);
    }

    return data;
  }

  async deleteForgotToken(token: string): Promise<void> {
    const { error, status, statusText } = await this.supabase
      .from('forgot_password_tokens')
      .delete()
      .eq('token', token);

    console.log({
      status,
      statusText,
      scope: 'delete forgot password token',
    });

    // Data not found
    if (error?.code === 'PGRST116') {
      console.log({
        params: { token },
        status,
        statusText,
        scope: 'delete forgot password token',
        error: error,
      });
    }

    if (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updatePassword(userId: string, newPassword: string): Promise<void> {
    const { error, status, statusText } = await this.supabase
      .from('users')
      .update({ password: newPassword })
      .eq('id', userId);

    console.log({
      status,
      statusText,
      scope: 'update password success',
    });

    if (error) {
      throw new BadRequestException(error.message);
    }
  }
}
