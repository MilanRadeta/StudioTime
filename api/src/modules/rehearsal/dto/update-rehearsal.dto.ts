import { OmitType, PartialType } from "@nestjs/mapped-types";
import { Rehearsal } from "../entities/rehearsal.entity";

export class UpdateRehearsalDto extends PartialType(OmitType(Rehearsal, ['clientId', 'studioId'])) {

}