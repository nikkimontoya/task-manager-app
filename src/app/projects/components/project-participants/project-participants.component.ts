import {Component, OnInit} from '@angular/core';
import {ProjectInterface} from '../../types/project.interface';

@Component({
    selector: 'tm-project-participants',
    templateUrl: './project-participants.component.html',
    styleUrls: ['./project-participants.component.scss']
})
export class ProjectParticipantsComponent implements OnInit {
    columnsToDisplay: string[] = ['name'];
    project: ProjectInterface;

    constructor() {}

    ngOnInit(): void {}
}
