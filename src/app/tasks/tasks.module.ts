import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TaskListComponent} from './components/task-list/task-list.component';
import {HttpClientModule} from '@angular/common/http';
import {TasksService} from './services/tasks.service';
import {DialogModule} from 'primeng/dialog';
import {DataViewModule} from 'primeng/dataview';
import {PanelModule} from 'primeng/panel';
import {ButtonModule} from 'primeng/button';
import {AddTaskDialogComponent} from './components/add-task-dialog/add-task-dialog.component';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ReactiveFormsModule} from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {SharedModule} from '../shared/shared.module';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {TaskComponent} from './components/task/task.component';
import {CardModule} from 'primeng/card';
import {TaskPageComponent} from './components/task-page/task-page.component';
import {RippleModule} from 'primeng/ripple';
import {TableModule} from 'primeng/table';
import {RouterModule} from '@angular/router';
import {MenuModule} from 'primeng/menu';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {TaskListPageComponent} from './components/task-list-page/task-list-page.component';

@NgModule({
    declarations: [TaskListComponent, AddTaskDialogComponent, TaskComponent, TaskPageComponent, TaskListPageComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        ButtonModule,
        DialogModule,
        DataViewModule,
        PanelModule,
        InputTextModule,
        InputTextareaModule,
        CalendarModule,
        DropdownModule,
        SharedModule,
        ConfirmPopupModule,
        CardModule,
        RippleModule,
        TableModule,
        RouterModule,
        MenuModule,
        MatTableModule,
        MatCardModule
    ],
    exports: [TaskListComponent],
    providers: [TasksService]
})
export class TasksModule {}
