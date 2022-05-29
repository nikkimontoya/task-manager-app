import {gql, Mutation} from 'apollo-angular';
import {LoginDto} from '../dto/login.dto';

export class LoginMutation extends Mutation<{login: LoginDto}> {
    override document = gql`
        mutation login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
                id
                firstName
                lastName
                email
                accessToken
            }
        }
    `;
}
