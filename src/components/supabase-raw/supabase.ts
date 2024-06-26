import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { Database } from '@global/types/supabase-types';

type supabaseParams = {
  withServiceRoleKey?: boolean;
};

export default (params?: supabaseParams): SupabaseClient => {
  const { withServiceRoleKey = false } = params || {};
  const url = process.env.SUPABASE_URL;
  const key =
    process.env[
      withServiceRoleKey ? 'SUPABASE_SERVICE_ROLE_KEY' : 'SUPABASE_ANON_KEY'
    ];
  return createClient<Database>(url, key);
};
