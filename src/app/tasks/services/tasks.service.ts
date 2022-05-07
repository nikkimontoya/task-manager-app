import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {TaskInterface} from '../types/task.interface';
import {AllTasksQuery} from '../graphql/all.tasks.query';
import {ByIdTasksQuery} from '../graphql/by-id.tasks.query';
import {AddTaskMutation} from '../graphql/add-task.mutation';
import {EditTaskMutation} from '../graphql/edit-task.mutation';

@Injectable()
export class TasksService {
    constructor(
        private http: HttpClient,
        private allTasksQuery: AllTasksQuery,
        private byIdTasksQuery: ByIdTasksQuery,
        private addTaskMutation: AddTaskMutation,
        private editTaskMutation: EditTaskMutation
    ) {}

    getAll(): Observable<TaskInterface[]> {
        return this.allTasksQuery.watch().valueChanges.pipe(map((result) => result.data.tasks as TaskInterface[]));
    }

    getById(id: number): Observable<TaskInterface> {
        return this.byIdTasksQuery.fetch({ids: [id]}).pipe(map((result) => result.data.tasks[0]));
    }

    add(task: TaskInterface): Observable<TaskInterface> {
        return this.addTaskMutation.mutate({task}).pipe(map((result) => result.data));
    }

    editById(id: number, task: TaskInterface): Observable<TaskInterface> {
        return this.editTaskMutation.mutate({id, task}).pipe(map((result) => result.data));
    }

    removeById(id: number): Observable<any> {
        return this.http.delete(`${environment.apiUrl}/tasks/${id}`);
    }
}
