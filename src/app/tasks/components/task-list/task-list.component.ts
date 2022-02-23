import {Component, OnDestroy, OnInit} from '@angular/core';
import {TasksService} from '../../services/tasks.service';
import {TaskInterface} from '../../types/task.interface';
import {ConfirmationService} from 'primeng/api';
import {HttpRequestState, httpRequestStates} from 'ngx-http-request-state';
import {MessagesService} from '../../../shared/services/messages.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'tm-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss'],
    providers: [ConfirmationService]
})
export class TaskListComponent implements OnInit, OnDestroy {
    tasks: TaskInterface[];
    showAddDialog = false;
    loading = false;
    error: string = null;
    editingTask: TaskInterface | null = null;
    subscriptions: Subscription[] = [];

    constructor(
        private tasksService: TasksService,
        private confirmationService: ConfirmationService,
        private messagesService: MessagesService
    ) {}

    ngOnInit(): void {
        const sub = this.tasksService
            .getAll()
            .pipe(httpRequestStates())
            .subscribe((requestState: HttpRequestState<TaskInterface[]>) => {
                this.tasks = requestState.value;
                this.loading = requestState.isLoading;
                this.error = requestState.error?.message || '';
            });

        this.subscriptions.push(sub);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }

    onTaskAdded(task: TaskInterface): void {
        this.tasks = [task, ...this.tasks];
    }

    onTaskEdited(task: TaskInterface): void {
        this.tasks = [task, ...this.tasks.filter((t) => t.id !== task.id)];
    }

    removeTask(event, id: number): void {
        this.confirmationService.confirm({
            target: event.target,
            message: 'Are you sure you want to remove this task?',
            accept: () => {
                const sub = this.tasksService
                    .removeById(id)
                    .pipe(httpRequestStates())
                    .subscribe((requestState: HttpRequestState<any>) => {
                        if (!requestState.isLoading && !requestState.error) {
                            this.tasks = this.tasks.filter((task) => task.id !== id);
                        } else if (requestState.error) {
                            this.messagesService.showError();
                        }
                    });

                this.subscriptions.push(sub);
            }
        });
    }

    openTaskDialog(task: TaskInterface | null): void {
        this.editingTask = task;
        this.showAddDialog = true;
    }
}
