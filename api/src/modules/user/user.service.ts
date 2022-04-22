import { Injectable } from '@nestjs/common';
import { CrudService } from '../shared/services/crud.service';
import { User } from './entities/user.entity';

@Injectable()
export class UserService extends CrudService<User> {
  protected collectionName: string = 'users';
}
