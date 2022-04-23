import {Component, OnDestroy, OnInit} from '@angular/core';
import {TaskInterface} from '../../types/task.interface';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

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

    constructor(public activatedRoute: ActivatedRoute) {}

    ngOnInit(): void {
        const sub = this.activatedRoute.data.subscribe((data) => (this.task = data.task));
        this.subscriptions.push(sub);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }
}
