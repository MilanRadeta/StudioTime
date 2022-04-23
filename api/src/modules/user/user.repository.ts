import { Injectable } from '@nestjs/common';
import { CrudRepository } from '../shared/repository/crud.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository extends CrudRepository<User> {
  protected collectionName: string = 'users';
}
