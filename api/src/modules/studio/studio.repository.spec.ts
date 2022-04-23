import { Test, TestingModule } from '@nestjs/testing';
import { StudioRepository } from './studio.repository';

describe('StudioRepository', () => {
  let service: StudioRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudioRepository],
    }).compile();

    service = module.get<StudioRepository>(StudioRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
