import {Component, OnInit} from '@angular/core';
import {map, Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectInterface} from '../../types/project.interface';

@Component({
    selector: 'tm-project-page',
    templateUrl: './project-page.component.html',
    styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent implements OnInit {
    project$: Observable<ProjectInterface>;
    tabs = [
        {
            title: 'Description',
            link: 'description'
        },
        {
            title: 'Participants',
            link: 'participants'
        },
        {
            title: 'Tasks',
            link: 'tasks'
        }
    ];

    constructor(public activatedRoute: ActivatedRoute, public router: Router) {}

    ngOnInit(): void {
        this.project$ = this.activatedRoute.data.pipe(map((data) => data.project));
    }

    onOutletLoaded(component: any, project: ProjectInterface) {
        component.project = project;
    }
}
