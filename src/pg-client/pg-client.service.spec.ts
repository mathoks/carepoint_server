import { Test, TestingModule } from '@nestjs/testing';
import { PgClientService } from './pg-client.service';

describe('PgClientService', () => {
  let service: PgClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PgClientService],
    }).compile();

    service = module.get<PgClientService>(PgClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
