import {Component, OnDestroy, OnInit} from '@angular/core';
import {TaskInterface} from '../../types/task.interface';
import {Subscription, switchMap} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {TasksService} from '../../services/tasks.service';
import {HttpRequestState, httpRequestStates} from 'ngx-http-request-state';

@Component({
    selector: 'tm-task-page',
    templateUrl: './task-page.component.html',
    styleUrls: ['./task-page.component.scss']
})
export class TaskPageComponent implements OnInit, OnDestroy {
    task: TaskInterface;
    loading = false;
    error: string = null;
    subscriptions: Subscription[] = [];

    constructor(private activatedRoute: ActivatedRoute, private tasksService: TasksService) {}

    ngOnInit(): void {
        const sub = this.activatedRoute.params
            .pipe(
                switchMap((params) => this.tasksService.getById(params.id)),
                httpRequestStates()
            )
            .subscribe((requestState: HttpRequestState<TaskInterface>) => {
                this.task = requestState.value;
                this.loading = requestState.isLoading;
                this.error = requestState.error?.message || '';
            });

        this.subscriptions.push(sub);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }
}
