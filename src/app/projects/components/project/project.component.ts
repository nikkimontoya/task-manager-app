import {Component, Input, OnInit} from '@angular/core';
import {ProjectInterface} from '../../types/project.interface';

@Component({
    selector: 'tm-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
    @Input() project: ProjectInterface;

    constructor() {}

    ngOnInit(): void {}
}
