import { Test, TestingModule } from '@nestjs/testing';
import { RehearsalController } from './rehearsal.controller';
import { RehearsalService } from './rehearsal.service';

describe('RehearsalController', () => {
  let controller: RehearsalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RehearsalController],
      providers: [RehearsalService],
    }).compile();

    controller = module.get<RehearsalController>(RehearsalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
