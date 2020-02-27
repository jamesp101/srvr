import {Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, OneToMany, ManyToOne, Unique} from "typeorm";
import { Device } from "./Device";

@Entity()
@Unique(['username', 'email'])
export class User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    username!: string;

    @Column()
    password!: string;

    @Column()
    firstname!: string;

    @Column()
    lastname!: string;

    @Column()
    email!: string;

    @OneToMany(type=> Device, device => device.user)
    devices!: Device;

}
