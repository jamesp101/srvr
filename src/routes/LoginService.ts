import { Path, POST } from 'typescript-rest';
import { getConnection } from 'typeorm';
import { User } from '../entity/User';
import * as bcrypt from 'bcryptjs';



@Path('/login')
export class Login {


    @POST
    login(data: LoginJSON) {
        return this.loginUser(data)

    }




    async loginUser(data: LoginJSON) {

        try {
            const repository = getConnection().getRepository(User)
            const user: User | any = await repository.findOne({
                username: data.username,
            })

            const compare: boolean = bcrypt.compareSync(data.password, user.password)

            if (!compare) {
                throw "Username or Password not found";
            }

            return user

        } catch (e) {
            if (e)
                return {
                    code: 'login-fail',
                    description: e
                }
        }

    }

}


interface LoginJSON {
    username: string;
    password: string;
}
interface LoginResponse {
    code: string;
    description: string;
    key?: string;
    user?: User;

}