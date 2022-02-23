import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {LoginInterface} from '../types/login.interface';
import {UserInterface} from '../types/user.interface';
import {Observable, tap} from 'rxjs';
import {RegisterInterface} from '../types/register.interface';
import {StorageService} from './storage.service';

const USER_STORAGE_KEY = 'currentUser';

@Injectable()
export class UserService {
    constructor(private http: HttpClient, private storage: StorageService) {}

    register(data: RegisterInterface) {
        return this.http.post<UserInterface>(`${environment.apiUrl}/auth/register`, data).pipe(
            tap((user: UserInterface) => {
                this.setCurrentUser(user);
            })
        );
    }

    login(data: LoginInterface): Observable<UserInterface> {
        return this.http.post<UserInterface>(`${environment.apiUrl}/auth/login`, data).pipe(
            tap((user: UserInterface) => {
                this.setCurrentUser(user);
            })
        );
    }

    getAll(): Observable<UserInterface[]> {
        return this.http.get<UserInterface[]>(`${environment.apiUrl}/auth/users`);
    }

    getCurrentUser(): UserInterface | null {
        return this.storage.getItem(USER_STORAGE_KEY);
    }

    private setCurrentUser(user: UserInterface) {
        this.storage.setItem(USER_STORAGE_KEY, user);
    }
}
