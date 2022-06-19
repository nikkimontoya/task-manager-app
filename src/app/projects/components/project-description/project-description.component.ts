import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProjectInterface} from '../../types/project.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ProjectPageDataService} from '../../services/project-page-data.service';
import {MainProjectDataInterface} from '../../types/main-project-data.interface';
import {TopMenuService} from '../../../shared/services/top-menu.service';

@Component({
    selector: 'tm-project-description',
    templateUrl: './project-description.component.html',
    styleUrls: ['./project-description.component.scss']
})
export class ProjectDescriptionComponent implements OnInit, OnDestroy {
    project: ProjectInterface;
    editMode: boolean;
    subs: Subscription[] = [];

    constructor(public dataService: ProjectPageDataService, private topMenuService: TopMenuService) {}

    ngOnInit(): void {
        this.subs.push(
            this.dataService.project$.subscribe((project) => {
                this.project = project;
            })
        );

        this.setEditAction();
    }

    ngOnDestroy() {
        this.subs.forEach((sub) => sub.unsubscribe());
    }

    save(data: MainProjectDataInterface) {
        this.dataService.editProject(data);
        this.editMode = false;
    }

    cancel() {
        this.editMode = false;
    }

    private setEditAction(): void {
        this.topMenuService.setActions([
            {
                icon: 'edit',
                tooltip: 'Edit',
                handler: () => {
                    this.editMode = true;
                    this.setEndEditAction();
                }
            }
        ]);
    }

    private setEndEditAction(): void {
        this.topMenuService.setActions([
            {
                icon: 'edit_off',
                tooltip: 'End editing',
                handler: () => {
                    this.editMode = false;
                    this.setEditAction();
                }
            }
        ]);
    }
}
