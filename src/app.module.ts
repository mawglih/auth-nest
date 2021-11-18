import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Article } from './forms/article/article.entity';
import { Forms } from './forms/forms.entity';
import { FormsModule } from './forms/forms.module';
import { UserModule } from './users/user.module';
import { User } from './users/user.entity';
import { TodoModule } from './todo/todo.module';
import { Todo } from './todo/todo.entity';

@Module({
  imports: [
    FormsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Forms, Article, User, Todo],
      synchronize: true,
    }),
    UserModule,
    TodoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
