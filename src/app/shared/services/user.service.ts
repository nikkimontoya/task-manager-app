import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {UserInterface} from '../types/user.interface';
import {Observable} from 'rxjs';
import {StorageService} from './storage.service';
import {Router} from '@angular/router';

const USER_STORAGE_KEY = 'currentUser';

@Injectable()
export class UserService {
    constructor(private http: HttpClient, private storage: StorageService, private router: Router) {}

    getAll(): Observable<UserInterface[]> {
        return this.http.get<UserInterface[]>(`${environment.apiUrl}/auth/users`);
    }

    getCurrentUser(): UserInterface | null {
        return this.storage.getItem(USER_STORAGE_KEY);
    }

    setCurrentUser(user: UserInterface) {
        this.storage.setItem(USER_STORAGE_KEY, user);
    }

    clearCurrentUser() {
        this.storage.removeItem(USER_STORAGE_KEY);
    }
}
