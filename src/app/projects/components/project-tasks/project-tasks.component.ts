import {Component, OnInit} from '@angular/core';
import {ProjectPageDataService} from '../../services/project-page-data.service';
import {TopMenuService} from '../../../shared/services/top-menu.service';

@Component({
    selector: 'tm-project-tasks',
    templateUrl: './project-tasks.component.html',
    styleUrls: ['./project-tasks.component.scss']
})
export class ProjectTasksComponent implements OnInit {
    constructor(public dataService: ProjectPageDataService, private topMenuService: TopMenuService) {}

    ngOnInit(): void {
        this.topMenuService.setActions([
            {
                icon: 'add',
                tooltip: 'Add tasks',
                handler: () => this.addTasks()
            }
        ]);
    }

    private addTasks() {}
}
