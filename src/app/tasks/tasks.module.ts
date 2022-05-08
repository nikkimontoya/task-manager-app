import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TaskListComponent} from './components/task-list/task-list.component';
import {HttpClientModule} from '@angular/common/http';
import {TasksService} from './services/tasks.service';
import {AddTaskDialogComponent} from './components/add-task-dialog/add-task-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {TaskComponent} from './components/task/task.component';
import {TaskPageComponent} from './components/task-page/task-page.component';
import {RouterModule} from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {TaskListPageComponent} from './components/task-list-page/task-list-page.component';
import {AllTasksQuery} from './graphql/all.tasks.query';
import {ByIdTasksQuery} from './graphql/by-id.tasks.query';
import {AddTaskMutation} from './graphql/add-task.mutation';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {AddTaskDialogDataService} from './services/add-task-dialog-data.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {EditTaskMutation} from './graphql/edit-task.mutation';
import {MatIconModule} from '@angular/material/icon';
import {RemoveTaskMutation} from './graphql/remove-task.mutation';
import {RemoveTaskConfirmationComponent} from './components/remove-task-confirmation/remove-task-confirmation.component';

@NgModule({
    declarations: [
        TaskListComponent,
        AddTaskDialogComponent,
        TaskComponent,
        TaskPageComponent,
        TaskListPageComponent,
        RemoveTaskConfirmationComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        SharedModule,
        RouterModule,
        MatTableModule,
        MatCardModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatIconModule
    ],
    exports: [TaskListComponent],
    providers: [
        TasksService,
        AllTasksQuery,
        ByIdTasksQuery,
        AddTaskMutation,
        AddTaskDialogDataService,
        EditTaskMutation,
        RemoveTaskMutation
    ]
})
export class TasksModule {}
