import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { FirebaseAuthStrategyName } from 'src/strategies/firebase-auth.strategy';

@Injectable()
export class FirebaseAuthGuard extends AuthGuard(FirebaseAuthStrategyName) {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>('public', [
      context.getHandler(),
      context.getClass(),
    ]);
    
    return isPublic || super.canActivate(context);
  }
}