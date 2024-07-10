import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { NotesSupabaseService } from './services/notes.supabase.service';
import { SupabaseProvider } from '@components/supabase/supabase.provider';

@Module({
  controllers: [NotesController],
  providers: [
    SupabaseProvider,
    {
      provide: NotesService,
      useClass: NotesSupabaseService,
    },
  ],
})
export class NotesModule {}
