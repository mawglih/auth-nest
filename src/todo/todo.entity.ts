import { BlobOptions } from "buffer";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    important: boolean;

    @Column()
    hasSubTasks: boolean;

    @Column()
    dueDate: Date;

    @Column()
    completed: boolean;
}