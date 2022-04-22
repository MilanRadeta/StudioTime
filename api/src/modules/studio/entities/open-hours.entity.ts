import { IsEnum, IsMilitaryTime } from "class-validator";
import { DayOfWeek } from "./day-of-week.entity";

export class OpenHours {
    
    @IsMilitaryTime()
    from: Date;

    @IsMilitaryTime()
    to: Date;

    @IsEnum(DayOfWeek)
    day: DayOfWeek;
}