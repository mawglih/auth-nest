import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, AfterInsert, AfterUpdate, AfterRemove } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    admin: boolean;

    @AfterInsert()
    logInsert() {
        console.log('Inserted User with id', this.id);
    }

    @AfterUpdate()
    logUpdate() {
        console.log('Updated User with id', this.id);
    }

    @AfterRemove()
    logRemove() {
        console.log('Removed User with id', this.id);
    }
}
