import {Path, POST, GET, PathParam} from 'typescript-rest';
import { User } from '../entity/User';

import * as bcrypt from 'bcryptjs';
import {getConnection, createConnection, Connection} from 'typeorm';


@Path('/register')
export class Register{

    @POST
    register(user: UserRegisterJSON): Promise<RegisterResponse>{
        return this.newUser(user)
        
    }

    async newUser(info: UserRegisterJSON){

        const user = new User();
        user.username = info.username ;
        user.password = this.hashPassword(info.password);
        user.firstname = info.firstname;
        user.lastname = info.lastname;
        user.email = info.email;

        let connection = getConnection()
        try{
            await connection.manager.save(user)

            return this.respond('register-ok', 'Register Success')

        }catch(e){
            return this.respond('register-fail', e.message)
        }   
     }

     respond(code: string, description: string): RegisterResponse{
         const response: RegisterResponse = {
             code: code,
             description: description
         }
         return response
     }



     

    hashPassword(password: string): string{
        const hash = bcrypt.hashSync(password,10)
        return hash
    }


}
interface UserRegisterJSON{
    username: string;
    password: string;
    email: string;
    firstname: string,
    lastname: string
}
interface RegisterResponse{
    code: string;
    description: string;
    error?: string
}
