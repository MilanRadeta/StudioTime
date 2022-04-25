import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { CrudService } from '../shared/services/crud.service';
import { Studio } from './entities/studio.entity';
import { StudioRepository } from './studio.repository';

@Injectable()
export class StudioService extends CrudService<Studio> {
  constructor(repo: StudioRepository) { super(repo); }

  async update(entity: Partial<Studio>, options: { user: DecodedIdToken }): Promise<Studio> {
    const found = await this.findOne(entity.uid);
    if (!found) {
        throw new NotFoundException("Entity not found");
    }
    if (!found.managers.includes(options.user.uid)) {
      throw new ForbiddenException();
    }
    if (!!entity.managers && !entity.managers.length) {
      throw new BadRequestException("Studio must have at least one manager.");
    }
    entity = { ...found, ...entity };
    return this.save(entity as Studio);
    
  }
}
