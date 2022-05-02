import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserInterface} from '../types/user.interface';
import {StorageService} from '../../shared/services/storage.service';

const USER_STORAGE_KEY = 'currentUser';

@Injectable({providedIn: 'root'})
export class UserService {
    constructor(private http: HttpClient, private storage: StorageService) {}

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
