import { IsString, IsBoolean } from 'class-validator';

export class CreateUserDto {
    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsBoolean()
    admin: boolean;
}