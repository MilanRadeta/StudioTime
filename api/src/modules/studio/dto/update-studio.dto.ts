import { PartialType } from "@nestjs/mapped-types";
import { Studio } from "../entities/studio.entity";

export class UpdateStudioDto extends PartialType(Studio) {

}