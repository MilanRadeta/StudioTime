import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumberString, ValidateBy, ValidateNested } from "class-validator";
import { Address } from "src/modules/shared/model/address.entity";
import { OpenHours } from "./open-hours.entity";

export class Studio {
    uid: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => Address)
    address: Address;

    @IsNotEmpty()
    @IsNumberString()
    phoneNumber: string;

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => OpenHours)
    openHours: OpenHours[];

    @IsArray()
    managers: string[];

    @IsArray()
    @ArrayMinSize(1)
    @IsNotEmpty({
        each: true
    })
    rooms: string[];
}
