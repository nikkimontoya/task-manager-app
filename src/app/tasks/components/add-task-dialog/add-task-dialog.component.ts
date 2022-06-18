import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {TasksService} from '../../services/tasks.service';
import {TaskInterface} from '../../types/task.interface';
import {Subscription} from 'rxjs';
import {UserService} from '../../../user/services/user.service';
import {HttpRequestState, httpRequestStates} from 'ngx-http-request-state';
import {MessagesService} from '../../../shared/services/messages.service';
import {AddTaskDialogDataService} from '../../services/add-task-dialog-data.service';
import {AddTaskDialogProjectInterface, AddTaskDialogUserInterface} from '../../types/add-task-dialog-data.interface';

@Component({
    selector: 'tm-add-task-dialog',
    templateUrl: './add-task-dialog.component.html',
    styleUrls: ['./add-task-dialog.component.scss']
})
export class AddTaskDialogComponent implements OnInit, OnDestroy {
    form: FormGroup;
    minDeadlineDate: Date;
    subscriptions: Subscription[] = [];
    users: AddTaskDialogUserInterface[] = [];
    projects: AddTaskDialogProjectInterface[] = [];

    constructor(
        private fb: FormBuilder,
        private tasksService: TasksService,
        public userService: UserService,
        private messagesService: MessagesService,
        private dataService: AddTaskDialogDataService,
        public dialogRef: MatDialogRef<AddTaskDialogComponent>,
        @Inject(MAT_DIALOG_DATA)
        public data: {
            task: TaskInterface | null;
        }
    ) {}

    ngOnInit(): void {
        this.dataService.getData().subscribe((data) => {
            this.users = data.users;
            this.projects = data.projects;
            this.initForm();
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }

    submit(): void {
        if (!this.form.valid) {
            return;
        }

        if (this.data.task) {
            this.editTask();
        } else {
            this.addTask();
        }

        this.form.reset();
    }

    private initForm(): void {
        const now = new Date();
        const nowPlusTwoWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 14);
        this.minDeadlineDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

        this.form = this.fb.group({
            title: [this.data.task ? this.data.task.title : '', Validators.required],
            deadlineDate: [this.data.task?.deadlineDate ? new Date(this.data.task.deadlineDate) : nowPlusTwoWeek],
            executorId: [this.data.task ? this.data.task.executor.id : 1],
            projectId: [this.data.task ? this.data.task.project.id : 1],
            body: [this.data.task ? this.data.task.body : '', Validators.required]
        });
    }

    private addTask(): void {
        const sub = this.tasksService
            .add({
                ...this.form.value,
                authorId: this.userService.getCurrentUser().id
            })
            .pipe(httpRequestStates())
            .subscribe((requestState: HttpRequestState<TaskInterface>) => {
                if (!requestState.isLoading && !requestState.error) {
                    this.dialogRef.close({
                        saved: true,
                        payload: requestState.value
                    });
                } else if (requestState.error) {
                    this.messagesService.showError();
                }
            });

        this.subscriptions.push(sub);
    }

    private editTask(): void {
        const sub = this.tasksService
            .editById(this.data.task.id, {
                ...this.form.value,
                authorId: this.userService.getCurrentUser().id
            })
            .pipe(httpRequestStates())
            .subscribe((requestState: HttpRequestState<TaskInterface>) => {
                if (!requestState.isLoading && !requestState.error) {
                    this.dialogRef.close({
                        saved: true,
                        payload: requestState.value
                    });
                } else if (requestState.error) {
                    this.messagesService.showError();
                }
            });

        this.subscriptions.push(sub);
    }
}
