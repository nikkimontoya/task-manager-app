import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectPageDataService} from '../../services/project-page-data.service';

@Component({
    selector: 'tm-project-page',
    templateUrl: './project-page.component.html',
    styleUrls: ['./project-page.component.scss'],
    providers: [ProjectPageDataService]
})
export class ProjectPageComponent {
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
        public dataService: ProjectPageDataService
    ) {}
}
