import { Injectable } from '@nestjs/common';
import { CrudRepository } from '../shared/repository/crud.repository';
import { Rehearsal } from './entities/rehearsal.entity';

@Injectable()
export class RehearsalRepository extends CrudRepository<Rehearsal> {
  protected collectionName: string = 'rehearsals';

  findByStudioId(id: string): Promise<Rehearsal[]> {
    return this.collection.where('studioId', '==', id).get()
      .then(snapshot => snapshot.docs.map(d => d.data() as Rehearsal));
  }

}
