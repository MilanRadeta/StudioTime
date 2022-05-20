import { NotFoundException } from '@nestjs/common';
import { BaseEntity } from '../model/base.entity';
import { FIRESTORE } from '../firebase/firebase.admin';

export abstract class CrudRepository<T extends BaseEntity> {

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
    
    async clear() {
        const docs = await this.collection.listDocuments();
        await Promise.all(docs.map(d => this.remove(d.id)));
    }
}
