import { DayOfWeek } from "./DayOfWeek";
import { Period } from "./Period";

export interface OpenHours {
    period: Period;
    dayOfWeek: DayOfWeek;
}
