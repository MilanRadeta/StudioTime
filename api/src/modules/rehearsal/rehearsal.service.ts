import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { Period } from '../shared/model/period.entity';
import { CrudService } from '../shared/services/crud.service';
import { StudioService } from '../studio/studio.service';
import { Rehearsal } from './entities/rehearsal.entity';
import { RehearsalRepository } from './rehearsal.repository';
import { RehearsalValidationService } from './services/rehearsal-validation.service';

@Injectable()
export class RehearsalService extends CrudService<Rehearsal> {
  constructor(
    protected repo: RehearsalRepository,
    private studioService: StudioService,
    private validationService: RehearsalValidationService,
  ) { super(repo); }

  async create(rehearsal: Rehearsal): Promise<Rehearsal> {
    this.validationService.checkValidity(rehearsal);
    return this.repo.create(rehearsal);
  }

  findByStudioId(id: string, date?: Date, room?: string) {
    return this.repo.findByStudioId(id, date, room);
  }

  async findAvailablePeriods(id: string, date: Date, room?: string): Promise<Rehearsal[]> {

    const today = dayjs().startOf('day');
    const dateDay = dayjs(date).startOf('day');
    if (dateDay.isBefore(today)) {
      throw new BadRequestException('Invalid date - set in the past');
    }

    const studio = await this.studioService.findOne(id);
    const rehearsals = await this.findByStudioId(id, date, room);
    const openHours = studio.openHours.find(oh => oh.dayOfWeek === date.getDay())?.period;
    
    if (!openHours) {
      return [];
    }
    const rooms = room ? [room] : studio.rooms;
    return rooms.flatMap(r =>
      this.getAvailablePeriods(rehearsals, r, openHours).map(period => ({
        uid: '',
        date,
        period,
        room: r,
        studioId: id,
        clientId: '',
      })));
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
    this.validationService.checkValidity(entity as Rehearsal);
    return this.save(entity as Rehearsal);
  }

  private getRoomRehearsalsInOrder(rehearsals: Rehearsal[], room: string) {
    return rehearsals
      .filter(reh => reh.room === room)
      .sort((a, b) => a.period.from.localeCompare(b.period.from));
  }

  private getAvailablePeriods(rehearsals: Rehearsal[], room: string, openHours: Period) {
    const roomRehearsals = this.getRoomRehearsalsInOrder(rehearsals, room);
    const period = { ...openHours };

    let availablePeriods = roomRehearsals.map(reh => {
      const from = period.from;
      period.from = reh.period.to;
      return { from, to: reh.period.from };
    })

    availablePeriods = availablePeriods.filter(r => r.from !== r.to);
    if (period.from.localeCompare(period.to) < 0) {
      availablePeriods.push(period);
    }
    return availablePeriods;
  }
}
