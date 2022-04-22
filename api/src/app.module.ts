import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { FirebaseAuthGuard } from './modules/shared/guards/firebase-auth.guard';
import { FirebaseAuthStrategy } from './modules/shared/strategies/firebase-auth.strategy';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, FirebaseAuthStrategy, {
    provide: APP_GUARD,
    useClass: FirebaseAuthGuard,
  }],
})
export class AppModule {}
