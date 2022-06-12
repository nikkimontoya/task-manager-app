import {Component, OnInit} from '@angular/core';
import {ProjectInterface} from '../../types/project.interface';

@Component({
    selector: 'tm-project-tasks',
    templateUrl: './project-tasks.component.html',
    styleUrls: ['./project-tasks.component.scss']
})
export class ProjectTasksComponent implements OnInit {
    project: ProjectInterface;

    constructor() {}

    ngOnInit(): void {}
}
