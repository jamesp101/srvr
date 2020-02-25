import { Path, PathParam, GET, PUT } from "typescript-rest";
import { getCustomRepository, getRepository, getConnection, TreeRepository } from "typeorm";

import { User } from '../entity/User';
import { parse } from "url";

import * as bcrypt from 'bcryptjs';

@Path('/user')
export class UserService {

    @Path(':id')
    @GET
    userUserById(@PathParam('id') id: string, ) {
        return this.getUser(id)

    }

    @Path(':id')
    @PUT
    update(@PathParam('id') id: string, data: any) {
        return this.updateUser(id, data)
    }




    async getUser(id: string) {
        try {
            const repository = getConnection().getRepository(User)
            const user: User | any = await repository.findOne({
                id: parseInt(id)
            })
            return user
        } catch (e) {
            return e
        }

    }

    async updateUser(id: string, args: any) {
        const repository = getConnection().getRepository(User)
        try {
            const user: User | any = await repository.findOne({
                id: parseInt(id)
            })

            user.username = args.username
            user.password = this.hashPassword(args.password)
            user.firstname = args.firstname;
            user.lastname = args.lastname;
            user.email = args.email;

            await repository.save(user)
            return {
                code: 'user-update-ok',
                description: 'Udpated Success'
            }

        } catch (e) {
            return e
        }


    }


    hashPassword(password: string): string{
        const hash = bcrypt.hashSync(password,10)
        return hash
    }


}


