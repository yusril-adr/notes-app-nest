import { Module } from '@nestjs/common';
import { UtilitiesController } from './utilities.controller';
import { StorageService } from '@global/services/storage/storage.service';
import { SupabaseStorageService } from '@components/supabase/supabase.storage.service';
import { SupabaseProvider } from '@components/supabase/supabase.provider';

@Module({
  controllers: [UtilitiesController],
  providers: [
    SupabaseProvider,
    {
      provide: StorageService,
      useClass: SupabaseStorageService,
    },
  ],
})
export class UtilitiesModule {}
