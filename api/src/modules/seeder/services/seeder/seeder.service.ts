import { Injectable } from '@nestjs/common';
import { RehearsalService } from 'src/modules/rehearsal/rehearsal.service';
import { DayOfWeek } from 'src/modules/shared/model/day-of-week.entity';
import { Period } from 'src/modules/shared/model/period.entity';
import { OpenHours } from 'src/modules/studio/entities/open-hours.entity';
import { Studio } from 'src/modules/studio/entities/studio.entity';
import { StudioService } from 'src/modules/studio/studio.service';

@Injectable()
export class SeederService {

    constructor(
        private rehearsalService: RehearsalService,
        private studioService: StudioService,
    ) { }

    async seed() {
        await Promise.all([
            this.rehearsalService.clear(),
            this.studioService.clear()
        ]);
        let studios: Studio[] = this.studios;
        studios = await Promise.all(studios.map(s => this.studioService.save(s)));
    }

    get studios() {
        const numberOfStudios = 5;
        return Array.from(Array(numberOfStudios).keys()).map(index => ({
            uid: '',
            name: `Studio ${index}`,
            address: {
                city: `City ${index}`,
                number: `${index}`,
                street: `Street ${index}`,
                zipCode: '12345',
            },
            managers: [],
            phoneNumber: '555 123 4567',
            rooms: this.rooms,
            openHours: this.openHours,
        }));
    }

    get rooms() {
        const numberOfRooms = 3;
        return Array.from(Array(numberOfRooms).keys()).map(index => `Room ${index}`);
    }

    get openHours(): OpenHours[] {
        const workPeriod: Period = {
            from: '08:00',
            to: '20:00',
        };
        const splitPeriods: Period[] = [
            { from: '08:00', to: '12:00' },
            { from: '16:00', to: '20:00' },
        ]
        const workDays = [DayOfWeek.MONDAY, DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY, DayOfWeek.THURSDAY, DayOfWeek.FRIDAY];
        const hours = workDays.map(dayOfWeek => ({ dayOfWeek, period: workPeriod }));
        hours.push(...splitPeriods.map(period => ({ dayOfWeek: DayOfWeek.SATURDAY, period })));
        return hours;
    }
}
