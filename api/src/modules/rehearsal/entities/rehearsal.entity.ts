import { IsDate, IsNotEmpty } from "class-validator";

export class Rehearsal {
    uid: string;

    @IsDate()
    from: Date;

    @IsDate()
    to: Date;
    
    studioId: string;

    clientId: string;
}
