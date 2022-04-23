import { IsNotEmpty } from "class-validator";
import { Address } from "src/modules/shared/model/address.entity";

export class User {
    uid: string;

    @IsNotEmpty()
    name: string;
    
    address: Address;
}
