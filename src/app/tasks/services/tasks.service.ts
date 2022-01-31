import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {environment} from '../../../environments/environment';
import {TaskInterface} from '../types/task.interface';

@Injectable()
export class TasksService {
    constructor(private http: HttpClient) {}

    getAll(): Observable<TaskInterface[]> {
        return this.http.get<TaskInterface[]>(`${environment.apiUrl}/tasks`);
    }

    add(task: TaskInterface): Observable<any> {
        return this.http.post(`${environment.apiUrl}/tasks`, task);
    }
}
