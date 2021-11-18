import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UserService,
    AuthService, 
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor
    },
  ],
  controllers: [UserController, AuthController ]
})
export class UserModule {}
