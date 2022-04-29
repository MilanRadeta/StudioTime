import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { CrudRepository } from '../shared/repository/crud.repository';
import { Rehearsal } from './entities/rehearsal.entity';

@Injectable()
export class RehearsalRepository extends CrudRepository<Rehearsal> {
  protected collectionName: string = 'rehearsals';

  findByStudioId(id: string, date?: Date, room?: string): Promise<Rehearsal[]> {
    let collection = this.collection.where('studioId', '==', id);
    if (date) {
      collection = collection.where('date', '==', dayjs(date).startOf('day').toDate());
    }
    if (room) {
      collection = collection.where('room', '==', room);
    }
    return collection.get().then(snapshot => snapshot.docs.map(d => d.data() as Rehearsal));
  }

}
