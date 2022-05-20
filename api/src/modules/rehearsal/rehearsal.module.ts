import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { StudioModule } from '../studio/studio.module';
import { RehearsalController } from './rehearsal.controller';
import { RehearsalRepository } from './rehearsal.repository';
import { RehearsalService } from './rehearsal.service';
import { RehearsalValidationService } from './services/rehearsal-validation.service';

@Module({
  imports: [SharedModule, StudioModule],
  controllers: [RehearsalController],
  providers: [RehearsalRepository, RehearsalService, RehearsalValidationService],
  exports: [RehearsalService]
})
export class RehearsalModule { }
