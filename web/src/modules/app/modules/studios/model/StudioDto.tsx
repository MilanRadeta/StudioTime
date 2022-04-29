import { Address } from "../../../../shared/model/Address";
import { OpenHoursDto } from "../../../../shared/model/OpenHoursDto";

export interface StudioDto {
    uid: string;
    name: string;
    managers: string[];
    address: Address;
    phoneNumber: string;
    openHours: OpenHoursDto[];
    rooms: string[];
}