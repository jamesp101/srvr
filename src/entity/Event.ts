import {Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, OneToMany, ManyToMany, Unique, ManyToOne} from "typeorm";


@Entity()
export class Event{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    eventName!: string;


    @Column()
    eventType!: string;

    @Column()
    eventDate!: string;


}
