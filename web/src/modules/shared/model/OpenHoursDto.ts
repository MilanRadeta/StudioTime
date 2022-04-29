import { DayOfWeek } from "./DayOfWeek";
import { Period } from "./Period";

export interface OpenHoursDto {
    period: Period;
    dayOfWeek: DayOfWeek;
}
