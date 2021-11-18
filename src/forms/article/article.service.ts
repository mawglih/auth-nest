import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { CreateArticleDto } from '../dtos/create-article.dto';
import { Forms } from '../forms.entity';

@Injectable()
export class ArticleService {
    constructor(@InjectRepository(Article) private repo: Repository<Article>) {
        this.repo = repo;
    }
    getAll() {
        return this.repo.find();
    }
    async getAllForParent(parentId: number) {
        const articles = await this.repo.find({parentId});
        return articles;

    }
    create(parentId: number) {
        const article = this.repo.create();
        article.id = Math.floor(Math.random()*10000);
        article.parentId = parentId;
        article.name = 'New record';
        article.important = false;
        article.hasChildren = false;
        return this.repo.save(article);
    }
    async updateArticle(id: number, parentId: number, name: string, important: boolean, hasChildren: boolean) {
        const article = await this.repo.findOne(id);
        article.name = name;
        article.important = important;
        article.hasChildren = hasChildren;
        if(!article) {
            this.create(parentId);
        }
    }
}