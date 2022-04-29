import { PeriodDto } from "./PeriodDto";

export interface RehearsalDto {
    uid: string;
    date: Date;
    period: PeriodDto;
    room: string;
    studioId: string;
    clientId: string;
}