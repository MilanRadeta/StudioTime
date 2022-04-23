import { BaseEntity } from '../model/base.entity';
import { CrudRepository } from '../repository/crud.repository';

export abstract class CrudService<T extends BaseEntity> {

    constructor(protected repo: CrudRepository<T>) {}

    findAll() {
        return this.repo.findAll();
    }

    findOne(id: string) {
        return this.repo.findOne(id);
    }

    create(entity: T) {
        return this.repo.create(entity);
    }

    save(entity: T) {
        return this.repo.save(entity);
    }

    update(entity: Partial<T>) {
        return this.repo.update(entity);
    }

    remove(id: string) {
        return this.repo.remove(id);
    }
}
