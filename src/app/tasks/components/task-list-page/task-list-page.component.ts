import {Component, OnDestroy, OnInit} from '@angular/core';
import {filter, Subscription, switchMap} from 'rxjs';
import {TasksService} from '../../services/tasks.service';
import {ConfirmationService} from 'primeng/api';
import {MessagesService} from '../../../shared/services/messages.service';
import {HttpRequestState, httpRequestStates} from 'ngx-http-request-state';
import {TaskInterface} from '../../types/task.interface';
import {TopMenuActionInterface} from 'src/app/shared/components/top-menu/types';
import {MatDialog} from '@angular/material/dialog';
import {AddTaskDialogComponent} from '../add-task-dialog/add-task-dialog.component';
import {RemoveTaskResultInterface} from '../../types/remove-task-result.interface';
import {RemoveTaskConfirmationComponent} from '../remove-task-confirmation/remove-task-confirmation.component';
import {TopMenuService} from '../../../shared/services/top-menu.service';

@Component({
    selector: 'tm-task-list-page',
    templateUrl: './task-list-page.component.html',
    styleUrls: ['./task-list-page.component.scss'],
    providers: [ConfirmationService]
})
export class TaskListPageComponent implements OnInit, OnDestroy {
    subscriptions: Subscription[] = [];
    tasks: TaskInterface[];
    showAddDialog = false;
    loading = false;
    error: string = null;

    constructor(
        private tasksService: TasksService,
        private confirmationService: ConfirmationService,
        private messagesService: MessagesService,
        private dialogOpener: MatDialog,
        private topMenuService: TopMenuService
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
        this.topMenuService.setTitle('Tasks');
        this.topMenuService.setActions([
            {
                icon: 'add',
                tooltip: 'Add a task',
                handler: () => this.openTaskDialog(null)
            }
        ]);
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

    removeTask(id: number): void {
        const dialogRef = this.dialogOpener.open(RemoveTaskConfirmationComponent);

        // Removes the task if answer from the dialog is true
        const sub = dialogRef
            .afterClosed()
            .pipe(
                filter((result) => result),
                switchMap(() => this.tasksService.removeById(id)),
                httpRequestStates()
            )
            .subscribe((requestState: HttpRequestState<RemoveTaskResultInterface>) => {
                if (!requestState.isLoading && !requestState.error) {
                    if (requestState.value.successful) {
                        this.tasks = this.tasks.filter((task) => task.id != id);
                    }
                } else if (requestState.error) {
                    this.messagesService.showError();
                }
            });

        this.subscriptions.push(sub);
    }

    openTaskDialog(task: TaskInterface | null): void {
        const dialogRef = this.dialogOpener.open(AddTaskDialogComponent, {
            data: {
                task
            }
        });

        this.subscriptions.push(
            dialogRef
                .afterClosed()
                .pipe(filter((result) => result?.saved))
                .subscribe((result) => (task ? this.onTaskEdited(result.payload) : this.onTaskAdded(result.payload)))
        );
    }
}
