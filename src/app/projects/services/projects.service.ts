import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {ProjectInterface} from '../types/project.interface';
import {ProjectsQuery} from '../graphql/projects.query';
import {EditProjectMutation} from '../graphql/edit-project.mutation';
import {EditProjectDto} from '../dto/edit-project.dto';

@Injectable()
export class ProjectsService {
    constructor(private projectsQuery: ProjectsQuery, private editProjectMutation: EditProjectMutation) {}

    getByAdministratorId(id: number): Observable<ProjectInterface[]> {
        return this.projectsQuery.fetch({administratorId: id}).pipe(map((result) => result.data.projects));
    }

    getById(id: number): Observable<ProjectInterface> {
        return this.projectsQuery.fetch({ids: [id]}).pipe(map((result) => result.data.projects[0]));
    }

    edit(id: number, project: EditProjectDto): Observable<ProjectInterface> {
        return this.editProjectMutation.mutate({id, project}).pipe(map((data) => data.data.editProject));
    }
}
