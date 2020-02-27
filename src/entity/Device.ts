
import {Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, OneToMany, ManyToMany, Unique, ManyToOne} from "typeorm";
import { User } from "./User";
import { Timeline } from "./Timeline";

@Entity()
@Unique(['deviceID', 'user'])
export class Device{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    deviceID!: string;

    @Column()
    status!: string;
    
    @Column()
    alias!: string;

    @ManyToOne(type=> User, user=> user.devices)
    user!: User;
    
    @ManyToMany(type=> Timeline, timeline=>timeline.device)
    timeline!: Timeline[];

}
