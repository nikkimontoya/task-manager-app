import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {ProjectInterface} from '../types/project.interface';
import {ProjectsQuery} from '../graphql/projects.query';

@Injectable()
export class ProjectsService {
    constructor(private projectsQuery: ProjectsQuery) {}

    getByAdministratorId(id: number): Observable<ProjectInterface[]> {
        return this.projectsQuery.fetch({administratorId: id}).pipe(map((result) => result.data.projects));
    }

    getById(id: number): Observable<ProjectInterface> {
        return this.projectsQuery.fetch({ids: [id]}).pipe(map((result) => result.data.projects[0]));
    }
}
