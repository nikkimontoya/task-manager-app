import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TasksService} from '../../services/tasks.service';
import {TaskInterface} from '../../types/task.interface';
import {Subscription, switchMap} from 'rxjs';
import {UserService} from '../../../shared/services/user.service';
import {UserInterface} from '../../../shared/types/user.interface';

@Component({
    selector: 'tm-add-task-dialog',
    templateUrl: './add-task-dialog.component.html',
    styleUrls: ['./add-task-dialog.component.scss']
})
export class AddTaskDialogComponent implements OnInit, OnChanges {
    @Input() showDialog = false;
    @Input() task: TaskInterface | null = null;

    @Output() showDialogChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() taskAdded: EventEmitter<TaskInterface> = new EventEmitter<TaskInterface>();
    @Output() taskEdited: EventEmitter<TaskInterface> = new EventEmitter<TaskInterface>();

    form: FormGroup;
    minDeadlineDate: Date;
    users: UserInterface[];

    constructor(private fb: FormBuilder, private tasksService: TasksService, public userService: UserService) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.task) {
            this.initForm();
        }
    }

    async ngOnInit() {
        this.users = await this.userService.getAll();
    }

    async submit() {
        if (!this.form.valid) {
            return;
        }

        try {
            if (this.task) {
                await this.editTask();
            } else {
                await this.addTask();
            }

            this.showDialogChange.emit(false);
            this.form.reset();
        } catch (error) {}
    }

    private initForm(): void {
        const now = new Date();
        const nowPlusTwoWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 14);
        this.minDeadlineDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

        this.form = this.fb.group({
            title: [this.task ? this.task.title : '', Validators.required],
            deadlineDate: [this.task ? new Date(this.task.deadlineDate) : nowPlusTwoWeek],
            executorId: [this.task ? this.task.executorId : 1],
            body: [this.task ? this.task.body : '', Validators.required]
        });
    }

    private async addTask(): Promise<void> {
        const task = await this.tasksService.add({
            ...this.form.value,
            authorId: this.userService.getCurrentUser().id
        });

        this.taskAdded.emit(task);
    }

    private async editTask(): Promise<void> {
        const task = await this.tasksService.editById(this.task.id, {
            ...this.form.value,
            authorId: this.userService.getCurrentUser().id
        });

        this.taskEdited.emit(task);
    }
}
