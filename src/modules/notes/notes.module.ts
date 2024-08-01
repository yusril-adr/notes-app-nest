import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { NotesSupabaseService } from './services/notes.supabase.service';

@Module({
  controllers: [NotesController],
  providers: [
    {
      provide: NotesService,
      useClass: NotesSupabaseService,
    },
  ],
})
export class NotesModule {}
