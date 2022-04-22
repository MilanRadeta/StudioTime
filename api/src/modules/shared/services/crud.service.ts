import { BadRequestException, NotFoundException } from '@nestjs/common';
import { FIRESTORE } from '../firebase/firebase.admin';

type BaseEntity = { uid: string };

export abstract class CrudService<T extends BaseEntity> {

    protected collectionName: string;

    get collection() {
        return FIRESTORE.collection(this.collectionName);
    }

    async findAll() {
        const { docs } = await this.collection.get();
        return docs.map(d => d.data() as T);
    }

    findOne(id: string) {
        return this.collection.doc(id).get().then(d => d.data() as T);
    }

    async create(entity: T) {
        entity.uid = undefined;
        return this.save(entity);
    }

    async save(entity: T) {
        const doc = entity.uid ? this.collection.doc(entity.uid) : this.collection.doc();
        entity.uid = doc.id;
        await doc.set(entity);
        return entity;
    }

    async update(entity: Partial<T>) {
        const found = await this.findOne(entity.uid);
        if (!found) {
            throw new NotFoundException("Entity not found");
        }
        entity = { ...found, ...entity };
        return this.save(entity as T);
    }

    async remove(id: string) {
        await this.collection.doc(id).delete();
    }
}
