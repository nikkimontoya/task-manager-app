import {Injectable} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {ProjectInterface} from '../types/project.interface';
import {EditProjectDto} from '../dto/edit-project.dto';
import {ProjectsService} from './projects.service';

@Injectable()
export class ProjectPageDataService {
    private project: BehaviorSubject<ProjectInterface> = new BehaviorSubject<ProjectInterface>(null);
    project$: Observable<ProjectInterface> = this.project.asObservable();

    constructor(private route: ActivatedRoute, private projectsService: ProjectsService) {
        this.route.data.subscribe((data) => this.project.next(data.project));
    }

    editProject(project: EditProjectDto): void {
        this.projectsService
            .edit(this.project.value.id, project)
            .subscribe((updatedProject) => this.project.next({...this.project.value, ...updatedProject}));
    }
}
