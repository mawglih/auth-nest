import { IsString, IsBoolean } from 'class-validator';

export class CreateFormsDto {
    @IsString()
    name: string;

    @IsBoolean()
    important: boolean;

    @IsBoolean()
    hasChildren: boolean;
}