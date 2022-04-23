import { Module } from '@nestjs/common';
import { RehearsalService } from './rehearsal.service';
import { RehearsalController } from './rehearsal.controller';
import { SharedModule } from '../shared/shared.module';
import { RehearsalRepository } from './rehearsal.repository';

@Module({
  imports: [SharedModule],
  controllers: [RehearsalController],
  providers: [RehearsalRepository, RehearsalService]
})
export class RehearsalModule {}
