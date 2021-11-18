import { IsString, IsBoolean } from 'class-validator';

export class CreateArticleDto {
    @IsString()
    name: string;

    @IsString()
    parentId: String;

    @IsBoolean()
    important: boolean;

    @IsBoolean()
    hasChildren: boolean;
}