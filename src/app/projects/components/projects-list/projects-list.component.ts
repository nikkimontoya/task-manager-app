import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProjectInterface} from '../../types/project.interface';
import {ProjectsService} from '../../services/projects.service';
import {UserService} from '../../../shared/services/user.service';
import {HttpRequestState, httpRequestStates} from 'ngx-http-request-state';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
    selector: 'tm-projects-list',
    templateUrl: './projects-list.component.html',
    styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit, OnDestroy {
    projects: ProjectInterface[];
    loading: boolean = false;
    error: string = null;
    subscriptions: Subscription[] = [];

    constructor(private projectsService: ProjectsService, private userService: UserService, private router: Router) {}

    ngOnInit(): void {
        const sub = this.projectsService
            .getByAdministratorId(this.userService.getCurrentUser().id)
            .pipe(httpRequestStates())
            .subscribe((requestState: HttpRequestState<ProjectInterface[]>) => {
                this.projects = requestState.value;
                this.loading = requestState.isLoading;
                this.error = requestState.error?.message || '';
            });

        this.subscriptions.push(sub);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }

    goToProject(id: number) {
        this.router.navigate(['/projects', id]);
    }
}
