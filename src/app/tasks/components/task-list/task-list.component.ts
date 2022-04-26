import {Component, Input, OnInit} from '@angular/core';
import {TaskInterface} from '../../types/task.interface';

@Component({
    selector: 'tm-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
    @Input() tasks: TaskInterface[];
    @Input() showProjectColumn: boolean;

    columnsToDisplay: string[];

    ngOnInit(): void {
        this.columnsToDisplay = this.showProjectColumn
            ? ['title', 'executor', 'author', 'project', 'createdAt', 'deadlineDate']
            : ['title', 'executor', 'author', 'createdAt', 'deadlineDate'];
    }
}
