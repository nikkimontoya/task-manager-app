import {gql, Query} from 'apollo-angular';
import {LoginDto} from '../dto/login.dto';

export class LoginQuery extends Query<{login: LoginDto}> {
    override document = gql`
        query login($email: String!, $password: String!) {
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
