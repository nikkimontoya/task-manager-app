import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TasksService} from '../../services/tasks.service';
import {TaskInterface} from '../../types/task.interface';
import {Subscription, switchMap} from 'rxjs';
import {UserService} from '../../../shared/services/user.service';
import {UserInterface} from '../../../shared/types/user.interface';

@Component({
    selector: 'tm-add-task-dialog',
    templateUrl: './add-task-dialog.component.html',
    styleUrls: ['./add-task-dialog.component.scss']
})
export class AddTaskDialogComponent implements OnInit {
    @Input() showDialog = false;
    @Output() showDialogChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() taskAdded: EventEmitter<TaskInterface> = new EventEmitter<TaskInterface>();

    form: FormGroup;
    minDeadlineDate: Date;
    users: UserInterface[];

    constructor(private fb: FormBuilder, private tasksService: TasksService, public userService: UserService) {}

    async ngOnInit() {
        const now = new Date();
        const nowPlusTwoWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 14);
        this.minDeadlineDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

        this.form = this.fb.group({
            title: ['', Validators.required],
            deadlineDate: [nowPlusTwoWeek],
            executorId: [],
            body: ['', Validators.required]
        });

        this.users = await this.userService.getAll();
    }

    async submit() {
        if (!this.form.valid) {
            return;
        }

        try {
            const task = await this.tasksService.add({...this.form.value, authorId: 1});
            this.taskAdded.emit(task);
            this.showDialogChange.emit(false);
            this.form.reset();
        } catch (error) {}
    }
}
