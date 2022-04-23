import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { Period } from '../../shared/model/period.entity';
import { StudioService } from '../../studio/studio.service';
import { Rehearsal } from '../entities/rehearsal.entity';
import { RehearsalService } from '../rehearsal.service';

const format = 'HH:mm';
const periodToDays = (period: Period) => {
  const days = { from: dayjs(period.from, format), to: dayjs(period.to, format) };
  if (days.to < days.from) {
    days.to = days.to.add(1, 'day');
  }
  return days;
}

@Injectable()
export class RehearsalValidationService {
  constructor(
    @Inject(forwardRef(() => RehearsalService))
    private rehearsalService: RehearsalService,
    private studioService: StudioService,
  ) { }

  public checkValidity(rehearsal: Rehearsal) {
    if (!this.isRoomValid(rehearsal)) {
      throw new BadRequestException("Period does not have a valid room");
    }
    if (!this.isPeriodValid(rehearsal)) {
      throw new BadRequestException("Period not during open hours");
    }
    if (this.isInConflict(rehearsal)) {
      throw new BadRequestException("Rehearsal is conflicting with other rehearsals");
    }

  }

  private async isRoomValid(rehearsal: Rehearsal) {
    const studio = await this.studioService.findOne(rehearsal.studioId);
    return studio.rooms.includes(rehearsal.room);
  }

  private async isPeriodValid(rehearsal: Rehearsal) {
    const studio = await this.studioService.findOne(rehearsal.studioId);
    const openHoursForDay = studio.openHours.filter(oh => oh.dayOfWeek === rehearsal.day.getDay())
    const openPeriodsForDay = openHoursForDay.map(oh => periodToDays(oh.period));
    const scheduledPeriod = periodToDays(rehearsal.period);
    return openPeriodsForDay.some(op => scheduledPeriod.from >= op.from && scheduledPeriod.to <= op.to);
  }

  private async isInConflict(rehearsal: Rehearsal) {
    const rehearsals = await this.rehearsalService.findByStudioId(rehearsal.studioId);
    const sameDayRehearsals = rehearsals.filter(r => {
      if (r.uid === rehearsal.uid) {
        return false;
      }

      const rDay = dayjs(r.day).startOf('day');
      const rehearsalDay = dayjs(rehearsal.day).startOf('day');
      const isSameDay = rDay.isSame(rehearsalDay);
      return r.room === rehearsal.room && isSameDay
    });
    const sameDayPeriods = sameDayRehearsals.map(sdr => periodToDays(sdr.period));
    const scheduledPeriod = periodToDays(rehearsal.period);
    return sameDayPeriods.some(sdp => sdp.from <= scheduledPeriod.from && sdp.to > scheduledPeriod.from || sdp.from < scheduledPeriod.to && sdp.to >= scheduledPeriod.to)
  }
}
