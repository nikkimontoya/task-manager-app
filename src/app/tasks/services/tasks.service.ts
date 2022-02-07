import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {environment} from '../../../environments/environment';
import {TaskInterface} from '../types/task.interface';

@Injectable()
export class TasksService {
    constructor(private http: HttpClient) {}

    getAll(): Promise<TaskInterface[]> {
        return firstValueFrom(this.http.get<TaskInterface[]>(`${environment.apiUrl}/tasks`));
    }

    add(task: TaskInterface): Promise<any> {
        return firstValueFrom(this.http.post(`${environment.apiUrl}/tasks`, task));
    }

    editById(id: number, task: TaskInterface): Promise<any> {
        return firstValueFrom(this.http.put(`${environment.apiUrl}/tasks/${id}`, task));
    }

    removeById(id: number): Promise<any> {
        return firstValueFrom(this.http.delete(`${environment.apiUrl}/tasks/${id}`));
    }
}
