import {gql, Mutation} from 'apollo-angular';
import {LoginDto} from '../dto/login.dto';

export class RegisterMutation extends Mutation<{register: LoginDto}> {
    override document = gql`
        mutation register($data: RegisterInput!) {
            register(data: $data) {
                id
                firstName
                lastName
                email
                accessToken
            }
        }
    `;
}
