import {Injectable} from '@angular/core';
import {LoginMutation} from '../graphql/login.mutation';
import {map, Observable, tap} from 'rxjs';
import {UserService} from '../../user/services/user.service';
import {LoginDto} from '../dto/login.dto';
import {RegisterMutation} from '../graphql/register.mutation';
import {Router} from '@angular/router';
import {RegisterInterface} from '../types/register.interface';

@Injectable({providedIn: 'root'})
export class AuthService {
    constructor(
        private loginMutation: LoginMutation,
        private userService: UserService,
        private registerMutation: RegisterMutation,
        private router: Router
    ) {}

    login(email: string, password: string): Observable<LoginDto> {
        return this.loginMutation.mutate({email, password}).pipe(
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
