import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SharedModule } from '../shared/shared.module';
import { UserRepository } from './user.repository';

@Module({
  imports: [SharedModule],
  controllers: [UserController],
  providers: [UserRepository, UserService]
})
export class UserModule {}
