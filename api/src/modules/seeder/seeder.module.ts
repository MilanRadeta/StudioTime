import { Module } from '@nestjs/common';
import { RehearsalModule } from '../rehearsal/rehearsal.module';
import { StudioModule } from '../studio/studio.module';
import { SeederService } from './services/seeder/seeder.service';

@Module({
    imports: [RehearsalModule, StudioModule],
    providers: [SeederService]
})
export class SeederModule {}
