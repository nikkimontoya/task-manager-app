import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NavbarService {
    private openedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    opened$: Observable<boolean> = this.openedSubject.asObservable();

    open(): void {
        this.openedSubject.next(true);
    }

    close(): void {
        this.openedSubject.next(false);
    }
}
