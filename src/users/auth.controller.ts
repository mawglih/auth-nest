import { Controller, Get, UseInterceptors, Session, Post, Body } from '@nestjs/common';
import { CurrentUser } from './decorators/current-user.decorator';
import { UserDto } from './dtos/user.dto';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { Serialize } from './interceptors/serialize.interceptor';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService } from './auth.service';

@Serialize(UserDto)
@UseInterceptors(CurrentUserInterceptor)
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        ) {}
    @Get('/whoami')
    whoami(@CurrentUser() user: User) {
        console.log('get to whoami')
        return user;
    }

    @Post('/signout')
    signout(@Session() session: any) {
        session.userId = null;
    }
    @Post('/signin')
    async signinUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signin(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        console.log('received body: ', body)
        const user = await this.authService.signup(body.email, body.password);
        console.log('new user', user);
        session.userId = user.id;
        return user;
    }
}