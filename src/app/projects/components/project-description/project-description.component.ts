import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProjectInterface} from '../../types/project.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ProjectPageDataService} from '../../services/project-page-data.service';
import {MainProjectDataInterface} from '../../types/main-project-data.interface';

@Component({
    selector: 'tm-project-description',
    templateUrl: './project-description.component.html',
    styleUrls: ['./project-description.component.scss']
})
export class ProjectDescriptionComponent implements OnInit, OnDestroy {
    project: ProjectInterface;
    editMode: boolean;
    editForm: FormGroup;
    subs: Subscription[] = [];

    constructor(private fb: FormBuilder, public dataService: ProjectPageDataService) {}

    ngOnInit(): void {
        this.subs.push(
            this.dataService.project$.subscribe((project) => {
                this.project = project;
                this.initEditForm();
            })
        );
    }

    ngOnDestroy() {
        this.subs.forEach((sub) => sub.unsubscribe());
    }

    private initEditForm(): void {
        this.editForm = this.fb.group({
            name: [this.project.name, [Validators.required]],
            description: [this.project.description || '', [Validators.required]]
        });
    }

    save(data: MainProjectDataInterface) {
        this.dataService.editProject(data);
        this.editMode = false;
    }

    cancel() {
        this.editMode = false;
    }
}
