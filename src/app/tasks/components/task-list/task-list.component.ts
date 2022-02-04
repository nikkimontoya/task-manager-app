import {Component, OnInit} from '@angular/core';
import {TasksService} from '../../services/tasks.service';
import {TaskInterface} from '../../types/task.interface';
import {ConfirmationService} from 'primeng/api';

@Component({
    selector: 'tm-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss'],
    providers: [ConfirmationService]
})
export class TaskListComponent implements OnInit {
    tasks: TaskInterface[];
    showAddDialog = false;
    loading = false;
    error: string = null;

    constructor(private tasksService: TasksService, private confirmationService: ConfirmationService) {}

    async ngOnInit(): Promise<void> {
        try {
            this.loading = true;
            this.tasks = await this.tasksService.getAll();
        } catch (error) {
            this.error = 'Something went wrong. Please, try later.';
        }

        this.loading = false;
    }

    onTaskAdded(task: TaskInterface) {
        this.tasks = [task, ...this.tasks];
    }

    removeTask(event, id: number) {
        this.confirmationService.confirm({
            target: event.target,
            message: 'Are you sure you want to remove this task?',
            accept: async () => {
                await this.tasksService.removeById(id);
                this.tasks = this.tasks.filter((task) => task.id !== id);
            }
        });
    }
}
