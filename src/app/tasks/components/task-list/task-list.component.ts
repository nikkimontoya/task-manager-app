import {Component, Input} from '@angular/core';
import {TaskInterface} from '../../types/task.interface';

@Component({
    selector: 'tm-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
    @Input() tasks: TaskInterface[];
    columnsToDisplay: string[] = ['title', 'executor', 'author', 'project', 'createdAt', 'deadlineDate'];
}
