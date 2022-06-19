import {Component, OnInit} from '@angular/core';
import {ProjectPageDataService} from '../../services/project-page-data.service';
import {TopMenuService} from '../../../shared/services/top-menu.service';

@Component({
    selector: 'tm-project-participants',
    templateUrl: './project-participants.component.html',
    styleUrls: ['./project-participants.component.scss']
})
export class ProjectParticipantsComponent implements OnInit {
    columnsToDisplay: string[] = ['name'];

    constructor(public dataService: ProjectPageDataService, private topMenuService: TopMenuService) {}

    ngOnInit(): void {
        this.topMenuService.setActions([
            {
                icon: 'add',
                tooltip: 'Add participants',
                handler: () => this.addParticipants()
            }
        ]);
    }

    private addParticipants() {}
}
