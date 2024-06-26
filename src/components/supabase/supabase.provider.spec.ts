import { Test, TestingModule } from '@nestjs/testing';
import { SupabaseProvider } from './supabase.provider';

describe('Supabase', () => {
  let provider: SupabaseProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupabaseProvider],
    }).compile();

    provider = module.get<SupabaseProvider>(SupabaseProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
