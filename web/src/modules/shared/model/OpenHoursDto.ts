import { DayOfWeek } from "./DayOfWeek";
import { PeriodDto } from "./PeriodDto";

export interface OpenHoursDto {
    period: PeriodDto;
    dayOfWeek: DayOfWeek;
}
