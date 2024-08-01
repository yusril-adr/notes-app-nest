import { Module } from '@nestjs/common';
import { UtilitiesController } from './utilities.controller';
import { StorageService } from '@global/services/storage/storage.service';
import { SupabaseStorageService } from '@components/supabase/supabase.storage.service';

@Module({
  controllers: [UtilitiesController],
  providers: [
    {
      provide: StorageService,
      useClass: SupabaseStorageService,
    },
  ],
})
export class UtilitiesModule {}
