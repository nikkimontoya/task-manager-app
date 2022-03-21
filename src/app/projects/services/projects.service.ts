import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {ProjectInterface} from '../types/project.interface';

@Injectable()
export class ProjectsService {
    constructor(private http: HttpClient) {}

    getByAdministratorId(id: number): Observable<ProjectInterface[]> {
        return this.http.get<ProjectInterface[]>(`${environment.apiUrl}/projects`, {params: {administratorId: id}});
    }
}
