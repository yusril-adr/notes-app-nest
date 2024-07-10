import { Test, TestingModule } from '@nestjs/testing';
import { UsersSupabaseService } from './users.supabase.service';

describe('UsersSupabaseService', () => {
  let service: UsersSupabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersSupabaseService],
    }).compile();

    service = module.get<UsersSupabaseService>(UsersSupabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
