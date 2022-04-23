import { Injectable } from '@nestjs/common';
import { CrudService } from '../shared/services/crud.service';
import { Studio } from './entities/studio.entity';
import { StudioRepository } from './studio.repository';

@Injectable()
export class StudioService extends CrudService<Studio> {
  constructor(repo: StudioRepository) { super(repo); }
}
