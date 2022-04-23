import { Type } from "class-transformer";
import { IsEnum, ValidateNested } from "class-validator";
import { DayOfWeek } from "src/modules/shared/model/day-of-week.entity";
import { Period } from "src/modules/shared/model/period.entity";

export class OpenHours {
    @ValidateNested()
    @Type(() => Period)
    period: Period;

    @IsEnum(DayOfWeek)
    dayOfWeek: DayOfWeek;
}
