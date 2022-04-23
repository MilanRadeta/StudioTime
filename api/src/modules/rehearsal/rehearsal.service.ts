import { Injectable, NotFoundException } from '@nestjs/common';
import { CrudService } from '../shared/services/crud.service';
import { Rehearsal } from './entities/rehearsal.entity';
import { RehearsalRepository } from './rehearsal.repository';

@Injectable()
export class RehearsalService extends CrudService<Rehearsal> {
  constructor(protected repo: RehearsalRepository) { super(repo); }

  findByStudioId(id: string) {
    return this.repo.findByStudioId(id);
  }

  async update(entity: Partial<Rehearsal>) {
    const found = await this.findOne(entity.uid);
    if (!found) {
      throw new NotFoundException("Entity not found");
    }
    entity = {
      ...found, ...entity,
      clientId: found.clientId,
      studioId: found.studioId,
    };
    return this.save(entity as Rehearsal);
  }
}
