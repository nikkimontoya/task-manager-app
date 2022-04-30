import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Observable, Subscription} from 'rxjs';
import {TasksService} from '../../services/tasks.service';
import {ConfirmationService} from 'primeng/api';
import {MessagesService} from '../../../shared/services/messages.service';
import {HttpRequestState, httpRequestStates} from 'ngx-http-request-state';
import {TaskInterface} from '../../types/task.interface';
import {TopMenuActionInterface} from 'src/app/shared/components/top-menu/types';
import {MatDialog} from '@angular/material/dialog';
import {AddTaskDialogComponent} from '../add-task-dialog/add-task-dialog.component';
import {ProjectInterface} from '../../../projects/types/project.interface';
import {UserInterface} from '../../../shared/types/user.interface';
import {ProjectsService} from '../../../projects/services/projects.service';
import {UserService} from '../../../shared/services/user.service';

@Component({
    selector: 'tm-task-list-page',
    templateUrl: './task-list-page.component.html',
    styleUrls: ['./task-list-page.component.scss'],
    providers: [ConfirmationService]
})
export class TaskListPageComponent implements OnInit, OnDestroy {
    subscriptions: Subscription[] = [];
    tasks: TaskInterface[];
    availableProjects: ProjectInterface[] = null;
    availableUsers: UserInterface[] = null;
    showAddDialog = false;
    loading = false;
    error: string = null;
    topMenuActions: TopMenuActionInterface[] = [
        {
            icon: 'add',
            tooltip: 'Add a task',
            handler: () => this.openTaskDialog(null)
        }
    ];

    constructor(
        private tasksService: TasksService,
        private confirmationService: ConfirmationService,
        private messagesService: MessagesService,
        private addDialog: MatDialog,
        private projectsService: ProjectsService,
        private userService: UserService
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
        const subs: {users?: Observable<UserInterface[]>; projects?: Observable<ProjectInterface[]>} = {};
        let dialogRef;

        if (!this.availableProjects) {
            subs.projects = this.projectsService.getByAdministratorId(this.userService.getCurrentUser().id);
        }

        if (!this.availableUsers) {
            subs.users = this.userService.getAll();
        }

        if (Object.values(subs).length) {
            const sub = combineLatest(subs)
                .pipe(httpRequestStates())
                .subscribe(
                    (requestState: HttpRequestState<{users?: UserInterface[]; projects?: ProjectInterface[]}>) => {
                        if (!requestState.isLoading && !requestState.error) {
                            if (requestState.value.users) {
                                this.availableUsers = requestState.value.users;
                            }

                            if (requestState.value.projects) {
                                this.availableProjects = requestState.value.projects;
                            }

                            dialogRef = this.addDialog.open(AddTaskDialogComponent, {
                                data: {
                                    task,
                                    projects: this.availableProjects,
                                    users: this.availableUsers
                                }
                            });
                        } else if (requestState.error) {
                            this.messagesService.showError();
                        }
                    }
                );

            this.subscriptions.push(sub);
        } else {
            dialogRef = this.addDialog.open(AddTaskDialogComponent, {
                data: {
                    task,
                    projects: this.availableProjects,
                    users: this.availableUsers
                }
            });
        }
    }
}
