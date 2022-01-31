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

@NgModule({
    declarations: [TaskListComponent, AddTaskDialogComponent],
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
        DropdownModule
    ],
    providers: [TasksService]
})
export class TasksModule {}
