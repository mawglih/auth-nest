import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UserService } from "./user.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";


const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private usersService: UserService) {}

    async signup(email: string, password: string) {
        console.log('auth service: ', email, password);
        const users = await this.usersService.findAllEmails(email);
        if(users.length) {
            throw new BadRequestException('email in use')
        }
        const salt = randomBytes(8).toString('hex');
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        const result = salt + '.' + hash.toString('hex');
        const user = await this.usersService.create(email, result, false);
        return user;
    }

    async signin(email: string, password: string) {
        console.log('signin', email, password);
                const [user] = await this.usersService.findAllEmails(email);
        if (!user) {
            throw new NotFoundException('email not found');
        }
        const [salt, hash] = user.password.split('.');
        const newHash =  (await scrypt(password, salt, 32)) as Buffer;
        
        if(hash !== newHash.toString('hex')) {
            throw new BadRequestException('bad passsword')
            
        } 
        return user;

    }
}