import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { StudioController } from './studio.controller';
import { StudioRepository } from './studio.repository';
import { StudioService } from './studio.service';

@Module({
  imports: [SharedModule],
  controllers: [StudioController],
  providers: [StudioRepository, StudioService]
})
export class StudioModule {}
