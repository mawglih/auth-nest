import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Forms } from "../forms.entity";

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    parentId: number;

    @Column()
    name: string;

    @Column()
    important: boolean;

    @Column()
    hasChildren: boolean;

    @ManyToOne(() => Forms, form => form.articles)
    form: Forms;
}