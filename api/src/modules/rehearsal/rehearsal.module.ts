import { Module } from '@nestjs/common';
import { RehearsalService } from './rehearsal.service';
import { RehearsalController } from './rehearsal.controller';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [RehearsalController],
  providers: [RehearsalService]
})
export class RehearsalModule {}
