import { SupabaseProvider } from '@components/supabase/supabase.provider';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [SupabaseProvider],
  exports: [SupabaseProvider],
})
export class SupabaseModule {}
