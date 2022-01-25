import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {LoginInterface} from '../../auth/types/login.interface';
import {UserInterface} from '../types/user.interface';
import {Observable, Subject, tap} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    $currentUser: Subject<UserInterface> = new Subject<UserInterface>();

    constructor(private http: HttpClient) {}

    register() {}

    login(data: LoginInterface): Observable<UserInterface> {
        return this.http.post<UserInterface>(`${environment.apiUrl}/auth/login`, data).pipe(
            tap((user: UserInterface) => {
                this.$currentUser.next(user);
            })
        );
    }
}
