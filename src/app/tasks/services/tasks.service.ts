import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {TaskInterface} from '../types/task.interface';

@Injectable()
export class TasksService {
    constructor(private http: HttpClient) {}

    getAll(): Observable<TaskInterface[]> {
        return this.http.get<TaskInterface[]>(`${environment.apiUrl}/tasks`);
    }

    add(task: TaskInterface): Observable<TaskInterface> {
        return this.http.post<TaskInterface>(`${environment.apiUrl}/tasks`, task);
    }

    editById(id: number, task: TaskInterface): Observable<TaskInterface> {
        return this.http.put<TaskInterface>(`${environment.apiUrl}/tasks/${id}`, task);
    }

    removeById(id: number): Observable<any> {
        return this.http.delete(`${environment.apiUrl}/tasks/${id}`);
    }
}
