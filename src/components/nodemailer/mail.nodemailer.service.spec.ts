import { Test, TestingModule } from '@nestjs/testing';
import { NodemailerService } from './mail.nodemailer.services';

describe('NodemailerService', () => {
  let provider: NodemailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NodemailerService],
    }).compile();

    provider = module.get<NodemailerService>(NodemailerService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
