import { Module } from '@nestjs/common';
import { RehearsalService } from './rehearsal.service';
import { RehearsalController } from './rehearsal.controller';
import { SharedModule } from '../shared/shared.module';
import { RehearsalRepository } from './rehearsal.repository';
import { StudioService } from '../studio/studio.service';
import { StudioRepository } from '../studio/studio.repository';
import { RehearsalValidationService } from './services/rehearsal-validation.service';

@Module({
  imports: [SharedModule],
  controllers: [RehearsalController],
  providers: [RehearsalRepository, RehearsalService, RehearsalValidationService, StudioRepository, StudioService]
})
export class RehearsalModule {}
