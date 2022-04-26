import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {TaskInterface} from '../types/task.interface';
import {UserInterface} from '../../shared/types/user.interface';
import {ProjectInterface} from '../../projects/types/project.interface';
import {TaskDto} from '../dto/task.dto';
import {TasksDto} from '../dto/tasks.dto';
import {Apollo, gql} from 'apollo-angular';

@Injectable()
export class TasksService {
    constructor(private http: HttpClient, private apollo: Apollo) {}

    getAll(): Observable<TaskInterface[]> {
        return this.apollo
            .watchQuery<{tasks: TaskInterface[]}>({
                query: gql`
                    {
                        tasks {
                            id
                            title
                            body
                            author {
                                firstName
                                lastName
                            }
                            executor {
                                firstName
                                lastName
                            }
                            deadlineDate
                            createdAt
                            project {
                                id
                                name
                            }
                        }
                    }
                `
            })
            .valueChanges.pipe(map((result) => result.data.tasks as TaskInterface[]));
    }

    getById(id: number): Observable<TaskInterface> {
        return this.http.get<TaskDto>(`${environment.apiUrl}/tasks/${id}`).pipe(
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

    private processTasks(data: TasksDto): TaskInterface[] {
        return data.data.map((task: TaskInterface) => {
            const author = data.included.users.find((user: UserInterface) => user.id === task.authorId);
            const executor = data.included.users.find((user: UserInterface) => user.id === task.executorId);
            const project = data.included.projects.find((project: ProjectInterface) => (project.id = task.projectId));

            return {...task, author, executor, project};
        });
    }
}
