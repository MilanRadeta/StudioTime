import { IsNotEmpty } from "class-validator";

export class Address {
    @IsNotEmpty()
    city: string;
    
    @IsNotEmpty()
    street: string;

    @IsNotEmpty()
    number: string;

    @IsNotEmpty()
    zipCode: string;
}