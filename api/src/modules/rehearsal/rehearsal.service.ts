import { Injectable, NotFoundException } from '@nestjs/common';
import { CrudService } from '../shared/services/crud.service';
import { Rehearsal } from './entities/rehearsal.entity';
import { RehearsalRepository } from './rehearsal.repository';
import { RehearsalValidationService } from './services/rehearsal-validation.service';

@Injectable()
export class RehearsalService extends CrudService<Rehearsal> {
  constructor(
    protected repo: RehearsalRepository,
    private validationService: RehearsalValidationService,
  ) { super(repo); }

  async create(rehearsal: Rehearsal): Promise<Rehearsal> {
    this.validationService.checkValidity(rehearsal);
    return this.repo.create(rehearsal);
  }

  findByStudioId(id: string) {
    return this.repo.findByStudioId(id);
  }

  async update(entity: Partial<Rehearsal>) {
    const found = await this.findOne(entity.uid);
    if (!found) {
      throw new NotFoundException("Entity not found");
    }
    entity = {
      ...found, ...entity,
      clientId: found.clientId,
      studioId: found.studioId,
    };
    this.validationService.checkValidity(entity as Rehearsal);
    return this.save(entity as Rehearsal);
  }
}
