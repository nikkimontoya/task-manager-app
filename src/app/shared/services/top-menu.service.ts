import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {TopMenuStateInterface, TopMenuActionInterface} from '../components/top-menu/types';

const INITIAL_STATE: TopMenuStateInterface = {
    title: '',
    actions: []
};

@Injectable({
    providedIn: 'root'
})
export class TopMenuService {
    private state: BehaviorSubject<TopMenuStateInterface> = new BehaviorSubject<TopMenuStateInterface>(INITIAL_STATE);
    state$: Observable<TopMenuStateInterface> = this.state.asObservable();

    setTitle(title: string): void {
        this.state.next({...this.state.value, title});
    }

    setActions(actions: TopMenuActionInterface[]): void {
        this.state.next({...this.state.value, actions});
    }
}
