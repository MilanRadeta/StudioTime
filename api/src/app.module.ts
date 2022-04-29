import { Module } from '@nestjs/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RehearsalModule } from './modules/rehearsal/rehearsal.module';
import { FirebaseAuthGuard } from './modules/shared/guards/firebase-auth.guard';
import { ValidationPipe } from './modules/shared/pipes/validation.pipe';
import { FirebaseAuthStrategy } from './modules/shared/strategies/firebase-auth.strategy';
import { StudioModule } from './modules/studio/studio.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    UserModule,
    StudioModule,
    RehearsalModule
  ],
  controllers: [AppController],
  providers: [AppService, FirebaseAuthStrategy,
    {
      provide: APP_GUARD,
      useClass: FirebaseAuthGuard,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule { }
