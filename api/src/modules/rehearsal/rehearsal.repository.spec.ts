import { Test, TestingModule } from '@nestjs/testing';
import { RehearsalRepository } from './rehearsal.repository';

describe('RehearsalRepository', () => {
  let service: RehearsalRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RehearsalRepository],
    }).compile();

    service = module.get<RehearsalRepository>(RehearsalRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
