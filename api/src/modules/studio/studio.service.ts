import { Injectable } from '@nestjs/common';
import { CrudService } from '../shared/services/crud.service';
import { Studio } from './entities/studio.entity';

@Injectable()
export class StudioService extends CrudService<Studio> {
  protected collectionName: string = 'studios';
}
