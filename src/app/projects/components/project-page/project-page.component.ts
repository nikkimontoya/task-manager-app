import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectPageDataService} from '../../services/project-page-data.service';
import {TopMenuService} from '../../../shared/services/top-menu.service';
import {ProjectInterface} from '../../types/project.interface';
import {Subscription} from 'rxjs';

@Component({
    selector: 'tm-project-page',
    templateUrl: './project-page.component.html',
    styleUrls: ['./project-page.component.scss'],
    providers: [ProjectPageDataService]
})
export class ProjectPageComponent implements OnInit, OnDestroy {
    project: ProjectInterface;
    projectSub: Subscription;

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

    constructor(
        public activatedRoute: ActivatedRoute,
        public router: Router,
        public dataService: ProjectPageDataService,
        private topMenuService: TopMenuService
    ) {}

    ngOnInit(): void {
        this.projectSub = this.dataService.project$.subscribe((project) => {
            this.project = project;
            this.topMenuService.setTitle(`Project: ${project.name}`);
        });
    }

    ngOnDestroy(): void {
        this.projectSub.unsubscribe();
    }
}
