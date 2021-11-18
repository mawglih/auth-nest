import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Forms } from './forms.entity';

@Injectable()
export class FormsService {
    constructor(@InjectRepository(Forms) private repo: Repository<Forms>) {
        this.repo = repo;
    }
    getAll() {
        return this.repo.find();
    }
    async create() {
        const record = await this.repo.create();
        record.id = Math.floor(Math.random()*10000);
        record.name = `New record ${record.id}`;
        record.important = false;
        record.hasChildren = false;
        this.repo.save(record);
        console.log(record);
        return record;
    }
    async updateRecord(id: number, name: string, important: boolean, hasChildren: boolean) {
        const record = await this.repo.findOne(id);
        record.name = name;
        record.important = important;
        record.hasChildren = hasChildren;
        if(!record) {
            this.create();
        }
        return record;
    }

    findOne(id: number) {
        return this.repo.findOne(id);
    }
    async updImp(id: number) {
        const record = await this.findOne(id);
        record.important = !record.important;
        this.repo.save(record);
        return record;
    }
    async updChi(id: number) {
        const record = await this.findOne(id);
        record.hasChildren = true;
        this.repo.save(record);
        return record;
    }
    async deleteRecord(id: number) {
        const record = await this.findOne(id);
        if(!record) {
            throw  new NotFoundException(`no record found with id ${id}`);
        }
        this.repo.delete(record);
        return this.getAll()
    }
}
