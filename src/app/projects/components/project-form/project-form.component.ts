import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MainProjectDataInterface} from '../../types/main-project-data.interface';

@Component({
    selector: 'tm-project-form',
    templateUrl: './project-form.component.html',
    styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
    @Input() data: MainProjectDataInterface = {
        name: '',
        description: ''
    };

    @Output() formSave: EventEmitter<MainProjectDataInterface> = new EventEmitter<MainProjectDataInterface>();

    form: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.initForm();
    }

    save(): void {
        if (this.form.valid) {
            this.formSave.emit(this.form.value);
        }
    }

    private initForm(): void {
        this.form = this.fb.group({
            name: [this.data.name, [Validators.required]],
            description: [this.data.description || '', [Validators.required]]
        });
    }
}
