import { Entity, PrimaryGeneratedColumn, Column, ManyToMany,  } from "typeorm";
import { Device } from "./Device";


@Entity()
export class Timeline{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;


    @Column( )
    type!: string;


    @Column()
    date!: Date

    @ManyToMany(type=> Device, device=> device.timeline)
    device!: Device[];



    


}