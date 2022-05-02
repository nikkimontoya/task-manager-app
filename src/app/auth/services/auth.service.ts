import {Injectable} from '@angular/core';
import {LoginQuery} from '../graphql/login.query';
import {map, Observable, tap} from 'rxjs';
import {UserService} from '../../shared/services/user.service';
import {LoginDto} from '../dto/login.dto';

@Injectable()
export class AuthService {
    constructor(private loginQuery: LoginQuery, private userService: UserService) {}

    login(email: string, password: string): Observable<LoginDto> {
        return this.loginQuery.fetch({email, password}).pipe(
            map((result) => result.data.login),
            tap((loginData) => this.userService.setCurrentUser(loginData))
        );
    }
}
