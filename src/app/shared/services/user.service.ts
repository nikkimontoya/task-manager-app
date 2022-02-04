import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {LoginInterface} from '../types/login.interface';
import {UserInterface} from '../types/user.interface';
import {firstValueFrom, Observable, Subject, tap} from 'rxjs';
import {RegisterInterface} from '../types/register.interface';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    $currentUser: Subject<UserInterface> = new Subject<UserInterface>();

    constructor(private http: HttpClient) {}

    register(data: RegisterInterface) {
        return this.http.post<UserInterface>(`${environment.apiUrl}/auth/register`, data).pipe(
            tap((user: UserInterface) => {
                this.$currentUser.next(user);
            })
        );
    }

    login(data: LoginInterface): Promise<UserInterface> {
        return firstValueFrom(
            this.http.post<UserInterface>(`${environment.apiUrl}/auth/login`, data).pipe(
                tap((user: UserInterface) => {
                    this.$currentUser.next(user);
                })
            )
        );
    }

    getAll(): Promise<UserInterface[]> {
        return firstValueFrom(this.http.get<UserInterface[]>(`${environment.apiUrl}/auth/users`));
    }
}
