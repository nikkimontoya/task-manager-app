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
export class AddTaskDialogComponent implements OnInit, OnDestroy {
    @Input() showDialog = false;
    @Output() showDialogChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() taskAdded: EventEmitter<TaskInterface> = new EventEmitter<TaskInterface>();

    form: FormGroup;
    subscriptions: Subscription[] = [];
    minDeadlineDate: Date;
    users: UserInterface[];

    constructor(private fb: FormBuilder, private tasksService: TasksService, public userService: UserService) {}

    ngOnInit() {
        const now = new Date();
        const nowPlusTwoWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 14);

        this.minDeadlineDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

        const sub = this.userService.getAll().subscribe({
            next: (users) => (this.users = users)
        });

        this.subscriptions.push(sub);

        this.form = this.fb.group({
            title: ['', Validators.required],
            deadlineDate: [nowPlusTwoWeek],
            executorId: [],
            body: ['', Validators.required]
        });
    }

    ngOnDestroy() {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }

    submit() {
        if (!this.form.valid) {
            return;
        }

        const sub = this.tasksService.add({...this.form.value, authorId: 1}).subscribe((task) => {
            this.taskAdded.emit(task);
            this.showDialogChange.emit(false);
            this.form.reset();
        });

        this.subscriptions.push(sub);
    }
}
