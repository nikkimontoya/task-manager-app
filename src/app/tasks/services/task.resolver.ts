import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {TaskInterface} from '../types/task.interface';
import {Injectable} from '@angular/core';
import {TasksService} from './tasks.service';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export default class TaskResolver implements Resolve<TaskInterface> {
    constructor(private tasksService: TasksService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TaskInterface> {
        return this.tasksService.getById(route.params.id);
    }
}
