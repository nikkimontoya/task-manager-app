import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {TaskInterface} from '../types/task.interface';
import {UserInterface} from '../../shared/types/user.interface';

@Injectable()
export class TasksService {
    constructor(private http: HttpClient) {}

    getAll(): Observable<TaskInterface[]> {
        return this.http
            .get<{data: TaskInterface[]; included: {users: UserInterface[]}}>(`${environment.apiUrl}/tasks`)
            .pipe(map((response) => this.processTasks(response)));
    }

    getById(id: number): Observable<TaskInterface> {
        return this.http
            .get<{data: TaskInterface; included: {users: UserInterface[]}}>(`${environment.apiUrl}/tasks/${id}`)
            .pipe(
                map((response) => ({...response, data: [response.data]})),
                map((response) => this.processTasks(response)),
                map((response) => response[0])
            );
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

    private processTasks(data: {data: TaskInterface[]; included: {users: UserInterface[]}}): TaskInterface[] {
        return data.data.map((task: TaskInterface) => {
            const author = data.included.users.find((user: UserInterface) => user.id === task.authorId);
            const executor = data.included.users.find((user: UserInterface) => user.id === task.executorId);

            return {...task, author, executor};
        });
    }
}
