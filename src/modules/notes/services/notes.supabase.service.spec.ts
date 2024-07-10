import { Test, TestingModule } from '@nestjs/testing';
import { NotesSupabaseService } from './notes.supabase.service';

describe('NotesSupabaseService', () => {
  let service: NotesSupabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotesSupabaseService],
    }).compile();

    service = module.get<NotesSupabaseService>(NotesSupabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
