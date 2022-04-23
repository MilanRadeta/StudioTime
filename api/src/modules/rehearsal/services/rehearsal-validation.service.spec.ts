import { Test, TestingModule } from '@nestjs/testing';
import { RehearsalValidationService } from './rehearsal-validation.service';

describe('RehearsalValidationService', () => {
  let service: RehearsalValidationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RehearsalValidationService],
    }).compile();

    service = module.get<RehearsalValidationService>(RehearsalValidationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
