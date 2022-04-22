import { Injectable, NotFoundException } from '@nestjs/common';
import { CrudService } from '../shared/services/crud.service';
import { Rehearsal } from './entities/rehearsal.entity';

@Injectable()
export class RehearsalService extends CrudService<Rehearsal> {
  protected collectionName: string = 'rehearsals';

  findByStudioId(id: string) {
    return this.collection.doc(id).get()
      .then(d => d.data() as Rehearsal);
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
