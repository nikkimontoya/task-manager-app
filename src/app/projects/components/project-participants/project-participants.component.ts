import {Component} from '@angular/core';
import {ProjectPageDataService} from '../../services/project-page-data.service';

@Component({
    selector: 'tm-project-participants',
    templateUrl: './project-participants.component.html',
    styleUrls: ['./project-participants.component.scss']
})
export class ProjectParticipantsComponent {
    columnsToDisplay: string[] = ['name'];

    constructor(public dataService: ProjectPageDataService) {}
}
