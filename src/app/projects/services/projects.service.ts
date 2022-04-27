import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {ProjectInterface} from '../types/project.interface';
import {Apollo, gql} from 'apollo-angular';

@Injectable()
export class ProjectsService {
    constructor(private http: HttpClient, private apollo: Apollo) {}

    getByAdministratorId(id: number): Observable<ProjectInterface[]> {
        return this.http.get<ProjectInterface[]>(`${environment.apiUrl}/projects`, {params: {administratorId: id}});
    }

    getById(id: number): Observable<ProjectInterface> {
        return this.apollo
            .query<{projects: ProjectInterface[]}>({
                query: gql`
                    {
                        projects(ids: [${id}]) {
                            id
                            name
                            users {
                                firstName
                                lastName
                            }
                            tasks {
                                id
                                title
                                body
                                deadlineDate
                                createdAt
                                author {
                                    firstName
                                    lastName
                                }
                                executor {
                                    firstName
                                    lastName
                                }
                            }
                        }
                    }
                `
            })
            .pipe(map((result) => result.data.projects[0]));
    }
}
