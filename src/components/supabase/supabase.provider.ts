import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { Database } from '@global/types/supabase-types';

type initParams = {
  withServiceRoleKey?: boolean;
};

@Injectable()
export class SupabaseProvider {
  constructor(private readonly configService: ConfigService) {}

  init(params?: initParams): SupabaseClient {
    const { withServiceRoleKey = false } = params || {};
    const url = this.configService.get('SUPABASE_URL');
    const key = this.configService.get(
      withServiceRoleKey ? 'SUPABASE_SERVICE_ROLE_KEY' : 'SUPABASE_ANON_KEY',
    );
    console.log(url, key);
    return createClient<Database>(url, key);
  }
}
