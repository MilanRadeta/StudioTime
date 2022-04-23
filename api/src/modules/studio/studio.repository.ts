import { Injectable } from '@nestjs/common';
import { CrudRepository } from '../shared/repository/crud.repository';
import { Studio } from './entities/studio.entity';

@Injectable()
export class StudioRepository extends CrudRepository<Studio> {
  protected collectionName: string = 'studios';
}
