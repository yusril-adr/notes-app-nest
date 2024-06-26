import { Test, TestingModule } from '@nestjs/testing';
import { AuthsSupabaseService } from './auths.supabase.service';

describe('AuthsSupabaseService', () => {
  let service: AuthsSupabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthsSupabaseService],
    }).compile();

    service = module.get<AuthsSupabaseService>(AuthsSupabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
