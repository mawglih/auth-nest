import { Body, Controller, Get, Param, Patch, Post, Query, NotFoundException, Session, UseGuards } from '@nestjs/common';
import { Serialize } from 'src/users/interceptors/serialize.interceptor';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
        private authService: AuthService,
        ) {}
    
    @UseGuards(AuthGuard)
    @Get('/alladmin')
    getAllUsersAdmin() {
        return this.userService.findAll();
    }

    @Get('/all')
    getAllUsers() {
        return this.userService.findAll();
    }
    @Patch('/admin/:id')
    makeAdmin(@Param('id') id: string) {
        return this.userService.makeAdmin(parseInt(id));
    }
    @Get()
    findAllEmails(@Query('email') email: string) {
        console.log('controller', email);
        return this.userService.findAllEmails(email);
    }
   
    @Serialize(UserDto)
    @Get('/:id')
    async findUser(@Param('id') id:string) {
        const user = await this.userService.findOne(parseInt(id));
        if(!user) {
            throw new NotFoundException('user not found')
        }
        return user;
    }

    @Get('/whoami')
    whoami(@CurrentUser() user: string) {
        console.log('get to whoami')
        return user;
    }

}