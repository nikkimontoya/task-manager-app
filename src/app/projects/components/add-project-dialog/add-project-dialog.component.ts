import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ProjectsService} from '../../services/projects.service';
import {MainProjectDataInterface} from '../../types/main-project-data.interface';
import {UserService} from '../../../user/services/user.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'tm-add-project-dialog',
    templateUrl: './add-project-dialog.component.html',
    styleUrls: ['./add-project-dialog.component.scss']
})
export class AddProjectDialogComponent implements OnInit {
    form: FormGroup;

    constructor(
        private projectsService: ProjectsService,
        private userService: UserService,
        public dialogRef: MatDialogRef<AddProjectDialogComponent>
    ) {}

    ngOnInit(): void {}

    save(data: MainProjectDataInterface) {
        this.projectsService
            .create({...data, administrator: this.userService.getCurrentUser().id.toString(10)})
            .subscribe(() => this.dialogRef.close());
    }
}
