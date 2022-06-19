import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {filter, map, Observable} from 'rxjs';
import {HttpRequestState, httpRequestStates} from 'ngx-http-request-state';
import {ProjectInterface} from '../../types/project.interface';
import {ProjectsService} from '../../services/projects.service';
import {UserService} from '../../../user/services/user.service';
import {MatDialog} from '@angular/material/dialog';
import {AddProjectDialogComponent} from '../add-project-dialog/add-project-dialog.component';
import {TopMenuService} from '../../../shared/services/top-menu.service';

@Component({
    selector: 'tm-projects-list',
    templateUrl: './projects-list.component.html',
    styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {
    projects$: Observable<ProjectInterface[]>;
    loading: boolean = false;
    error: string = null;

    constructor(
        private projectsService: ProjectsService,
        private userService: UserService,
        private router: Router,
        private dialogOpener: MatDialog,
        private topMenuService: TopMenuService
    ) {}

    ngOnInit(): void {
        this.projects$ = this.projectsService.getByAdministratorId(this.userService.getCurrentUser().id).pipe(
            httpRequestStates(),
            filter((requestState: HttpRequestState<ProjectInterface[]>) => !!requestState.value),
            map((requestState: HttpRequestState<ProjectInterface[]>) => requestState.value)
        );

        this.topMenuService.setTitle('Projects');

        this.topMenuService.setActions([
            {
                icon: 'add',
                tooltip: 'Add a task',
                handler: () => this.addProject()
            }
        ]);
    }

    goToProject(id: number) {
        this.router.navigate(['/projects', id]);
    }

    private addProject(): void {
        this.dialogOpener.open(AddProjectDialogComponent, {width: '1200px'});
    }
}
