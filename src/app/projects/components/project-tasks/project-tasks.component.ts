import {Component} from '@angular/core';
import {ProjectPageDataService} from '../../services/project-page-data.service';

@Component({
    selector: 'tm-project-tasks',
    templateUrl: './project-tasks.component.html',
    styleUrls: ['./project-tasks.component.scss']
})
export class ProjectTasksComponent {
    constructor(public dataService: ProjectPageDataService) {}
}
