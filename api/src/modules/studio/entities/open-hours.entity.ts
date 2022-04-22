import { IsDate, IsEnum } from "class-validator";
import { DayOfWeek } from "./day-of-week.entity";

export class OpenHours {
    
    @IsDate()
    from: Date;

    @IsDate()
    to: Date;

    @IsEnum(DayOfWeek)
    day: DayOfWeek;
}