import { IsMilitaryTime } from "class-validator";

export class Period {
    
    @IsMilitaryTime()
    from: string;

    @IsMilitaryTime()
    to: string;
}