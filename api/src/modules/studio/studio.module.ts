import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { StudioController } from './studio.controller';
import { StudioService } from './studio.service';

@Module({
  imports: [SharedModule],
  controllers: [StudioController],
  providers: [StudioService]
})
export class StudioModule {}
