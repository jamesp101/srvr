import { Entity, PrimaryGeneratedColumn, Column, ManyToMany,  } from "typeorm";
import { Device } from "./Device";


@Entity()
export class Timeline{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;


    @Column( )
    timelinetype!: string;


    @Column()
    date!: string;

    @ManyToMany(type=> Device, device=> device.timeline)
    device!: Device[];




}
