import {Component, OnInit} from '@angular/core';
import {TasksService} from '../../services/tasks.service';
import {TaskInterface} from '../../types/task.interface';

@Component({
    selector: 'tm-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
    tasks: TaskInterface[];
    showAddDialog = false;

    constructor(private tasksService: TasksService) {}

    ngOnInit(): void {
        this.tasksService.getAll().subscribe({
            next: (tasks: TaskInterface[]) => {
                this.tasks = tasks;
            }
        });
    }

    onTaskAdded(task: TaskInterface) {
        this.tasks = [task, ...this.tasks];
    }
}
