import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, ValidateNested } from "class-validator";
import { Period } from "src/modules/shared/model/period.entity";

export class Rehearsal {
    uid: string;

    @IsDate()
    date: Date;

    @ValidateNested()
    @Type(() => Period)
    period: Period;

    @IsNotEmpty()
    room: string;

    studioId: string;

    clientId: string;
}
