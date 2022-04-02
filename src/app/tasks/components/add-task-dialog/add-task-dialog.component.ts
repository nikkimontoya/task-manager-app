import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TasksService} from '../../services/tasks.service';
import {TaskInterface} from '../../types/task.interface';
import {combineLatest, Subscription} from 'rxjs';
import {UserService} from '../../../shared/services/user.service';
import {UserInterface} from '../../../shared/types/user.interface';
import {HttpRequestState, httpRequestStates} from 'ngx-http-request-state';
import {MessagesService} from '../../../shared/services/messages.service';
import {ProjectsService} from '../../../projects/services/projects.service';
import {ProjectInterface} from '../../../projects/types/project.interface';

@Component({
    selector: 'tm-add-task-dialog',
    templateUrl: './add-task-dialog.component.html',
    styleUrls: ['./add-task-dialog.component.scss']
})
export class AddTaskDialogComponent implements OnInit, OnChanges, OnDestroy {
    @Input() showDialog = false;
    @Input() task: TaskInterface | null = null;

    @Output() showDialogChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() taskAdded: EventEmitter<TaskInterface> = new EventEmitter<TaskInterface>();
    @Output() taskEdited: EventEmitter<TaskInterface> = new EventEmitter<TaskInterface>();

    form: FormGroup;
    minDeadlineDate: Date;
    users: UserInterface[];
    projects: ProjectInterface[];
    subscriptions: Subscription[] = [];

    constructor(
        private fb: FormBuilder,
        private tasksService: TasksService,
        public userService: UserService,
        private messagesService: MessagesService,
        private projectsService: ProjectsService
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.task) {
            this.initForm();
        }
    }

    ngOnInit(): void {
        const sub = combineLatest({
            users: this.userService.getAll(),
            projects: this.projectsService.getByAdministratorId(this.userService.getCurrentUser().id)
        })
            .pipe(httpRequestStates())
            .subscribe((requestState: HttpRequestState<{users: UserInterface[]; projects: ProjectInterface[]}>) => {
                if (!requestState.isLoading && !requestState.error) {
                    this.users = requestState.value.users;
                    this.projects = requestState.value.projects;
                } else if (requestState.error) {
                    this.messagesService.showError();
                }
            });

        this.subscriptions.push(sub);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }

    submit(): void {
        if (!this.form.valid) {
            return;
        }

        if (this.task) {
            this.editTask();
        } else {
            this.addTask();
        }

        this.showDialogChange.emit(false);
        this.form.reset();
    }

    private initForm(): void {
        const now = new Date();
        const nowPlusTwoWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 14);
        this.minDeadlineDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

        this.form = this.fb.group({
            title: [this.task ? this.task.title : '', Validators.required],
            deadlineDate: [this.task ? new Date(this.task.deadlineDate) : nowPlusTwoWeek],
            executorId: [this.task ? this.task.executorId : 1],
            projectId: [this.task ? this.task.projectId : 1],
            body: [this.task ? this.task.body : '', Validators.required]
        });
    }

    private addTask(): void {
        const sub = this.tasksService
            .add({
                ...this.form.value,
                authorId: this.userService.getCurrentUser().id
            })
            .pipe(httpRequestStates())
            .subscribe((requestState: HttpRequestState<TaskInterface>) => {
                if (!requestState.isLoading && !requestState.error) {
                    this.taskAdded.emit(requestState.value);
                } else if (requestState.error) {
                    this.messagesService.showError();
                }
            });

        this.subscriptions.push(sub);
    }

    private editTask(): void {
        const sub = this.tasksService
            .editById(this.task.id, {
                ...this.form.value,
                authorId: this.userService.getCurrentUser().id
            })
            .pipe(httpRequestStates())
            .subscribe((requestState: HttpRequestState<TaskInterface>) => {
                if (!requestState.isLoading && !requestState.error) {
                    this.taskEdited.emit(requestState.value);
                } else if (requestState.error) {
                    this.messagesService.showError();
                }
            });

        this.subscriptions.push(sub);
    }
}
