import { report } from "process";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Article } from "./article/article.entity";

@Entity()
export class Forms {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    important: boolean;

    @Column()
    hasChildren: boolean;

    @OneToMany(() => Article, article => article.form)
    articles: Article[];

}