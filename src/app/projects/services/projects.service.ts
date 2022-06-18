import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {ProjectInterface} from '../types/project.interface';
import {ProjectsQuery} from '../graphql/projects.query';
import {EditProjectMutation} from '../graphql/edit-project.mutation';
import {EditProjectDto} from '../dto/edit-project.dto';
import {CreateProjectDto} from '../dto/create-project.dto';
import {CreateProjectMutation} from '../graphql/create-project.mutation';

@Injectable()
export class ProjectsService {
    constructor(
        private projectsQuery: ProjectsQuery,
        private editProjectMutation: EditProjectMutation,
        private createProjectMutation: CreateProjectMutation
    ) {}

    getByAdministratorId(id: number): Observable<ProjectInterface[]> {
        return this.projectsQuery.fetch({administratorId: id}).pipe(map((result) => result.data.projects));
    }

    getById(id: number): Observable<ProjectInterface> {
        return this.projectsQuery.fetch({ids: [id]}).pipe(map((result) => result.data.projects[0]));
    }

    create(project: CreateProjectDto): Observable<ProjectInterface> {
        return this.createProjectMutation.mutate({project}).pipe(map((data) => data.data.createProject));
    }

    edit(id: number, project: EditProjectDto): Observable<ProjectInterface> {
        return this.editProjectMutation.mutate({id, project}).pipe(map((data) => data.data.editProject));
    }
}
