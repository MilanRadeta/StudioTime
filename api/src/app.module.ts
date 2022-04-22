import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { FirebaseAuthGuard } from './modules/shared/guards/firebase-auth.guard';
import { FirebaseAuthStrategy } from './modules/shared/strategies/firebase-auth.strategy';
import { StudioModule } from './modules/studio/studio.module';
import { RehearsalModule } from './modules/rehearsal/rehearsal.module';

@Module({
  imports: [UserModule, AuthModule, StudioModule, RehearsalModule],
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
