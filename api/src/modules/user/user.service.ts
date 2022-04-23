import { Injectable } from '@nestjs/common';
import { CrudService } from '../shared/services/crud.service';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService extends CrudService<User> {
  constructor(repo: UserRepository) { super(repo); }
}
