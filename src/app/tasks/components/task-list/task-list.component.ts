import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TaskInterface} from '../../types/task.interface';

@Component({
    selector: 'tm-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
    @Input() tasks: TaskInterface[];
    @Input() showProjectColumn: boolean;
    @Output() editButtonClick: EventEmitter<TaskInterface> = new EventEmitter<TaskInterface>();
    @Output() removeButtonClick: EventEmitter<number> = new EventEmitter<number>();

    columnsToDisplay: string[];

    ngOnInit(): void {
        this.columnsToDisplay = this.showProjectColumn
            ? ['title', 'executor', 'author', 'project', 'createdAt', 'deadlineDate', 'operations']
            : ['title', 'executor', 'author', 'createdAt', 'deadlineDate', 'operations'];
    }
}
