import { Controller, Post, Get, Patch, Delete, NotFoundException, Param, Body } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from '../dtos/create-article.dto';
import { Forms } from '../forms.entity';
import { CreateFormsDto } from '../dtos/create-forms.dto';

@Controller('article')
export class ArticleController {
     constructor(private articleService: ArticleService) {}
    // @Post()
    // async updateArticle(@Param('parentId') parentId: string, @Param('name')name: string ) {
    //     const article = await this.articleService.updateArticle(parseInt(parentId), name);
    //     return article;
    // }
    @Get('/create/:parentId')
    async createArticle(@Param('parentId') parentId: string) {
        const article = await this.articleService.create(parseInt(parentId));
        return article;
    }
    @Get('/:parentId')
    async getAllForParent(@Param('parentId') parentId: string) {
        const articles = await this.articleService.getAllForParent(parseInt(parentId));
        return articles;
    }
}
