import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private repo: Repository<User>) {
        this.repo = repo;
    }
    create( email: string, password: string, admin: boolean) {
        const user =  this.repo.create({ email, password, admin });
        return this.repo.save(user);
    }
    async findOne(id: number) {
        if(!id) return null;
        const user = await this.repo.findOne(id);
        if(!user) {
            throw new  NotFoundException('user not found');
        }
        return user
    }

    async findAll(){
        const users = await this.repo.find();
        return users
    }

    async update(id: number, attrs: Partial<User>) {
        const user = await this.findOne(id);
        if(!user) {
            throw new  NotFoundException('user not found');
        }
        Object.assign(user, attrs);
        this.repo.save(user);
    }

    async remove(id: number) {
        const user = await this.findOne(id);
        if(!user) {
            throw new  NotFoundException('user not found');
        }
        return this.repo.remove(user);
    }

    async makeAdmin(id: number) {
        const user = await this.findOne(id);
        if(!user) {
            throw new  NotFoundException('user not found');
        }
        user.admin = !user.admin;
        return this.repo.save(user);
    }
    async findAllEmails(email) {
        const users = await this.repo.find({ email });
        return users;
    }
} 