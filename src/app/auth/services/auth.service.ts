import {Injectable} from '@angular/core';
import {LoginQuery} from '../graphql/login.query';
import {map, Observable, tap} from 'rxjs';
import {UserService} from '../../shared/services/user.service';
import {LoginDto} from '../dto/login.dto';
import {RegisterMutation} from '../graphql/register.mutation';
import {RegisterInterface} from '../../shared/types/register.interface';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthService {
    constructor(
        private loginQuery: LoginQuery,
        private userService: UserService,
        private registerMutation: RegisterMutation,
        private router: Router
    ) {}

    login(email: string, password: string): Observable<LoginDto> {
        return this.loginQuery.fetch({email, password}).pipe(
            map((result) => result.data.login),
            tap((loginData) => this.userService.setCurrentUser(loginData))
        );
    }

    register(data: RegisterInterface): Observable<LoginDto> {
        return this.registerMutation.mutate({data}).pipe(
            map((result) => result.data.register),
            tap((loginData) => this.userService.setCurrentUser(loginData))
        );
    }

    logout() {
        this.userService.clearCurrentUser();
        this.router.navigateByUrl('/login');
    }
}
