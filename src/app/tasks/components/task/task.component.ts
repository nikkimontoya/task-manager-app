import {Component, Input} from '@angular/core';
import {TaskInterface} from '../../types/task.interface';

@Component({
    selector: 'tm-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss']
})
export class TaskComponent {
    @Input() task: TaskInterface;
}
