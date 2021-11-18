import { Module } from '@nestjs/common';
import { TypeOrmModule  } from '@nestjs/typeorm';
import { FormsController } from './forms.controller';
import { FormsService } from './forms.service';
import { Forms } from './forms.entity';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [TypeOrmModule.forFeature([Forms]), ArticleModule],
  controllers: [FormsController],
  providers: [FormsService]
})
export class FormsModule {}
