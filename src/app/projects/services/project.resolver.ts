import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {ProjectInterface} from '../types/project.interface';
import {Injectable} from '@angular/core';
import {ProjectsService} from './projects.service';
import {Observable} from 'rxjs';

@Injectable()
export default class ProjectResolver implements Resolve<ProjectInterface> {
    constructor(private projectsService: ProjectsService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<ProjectInterface> {
        return this.projectsService.getById(route.params.id);
    }
}
