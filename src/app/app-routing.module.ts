import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TaskListComponent} from './tasks/components/task-list/task-list.component';
import {AuthGuard} from './auth/guards/auth.guard';
import {TaskPageComponent} from './tasks/components/task-page/task-page.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/tasks',
        pathMatch: 'full'
    },
    {
        path: 'tasks',
        component: TaskListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'tasks/:id',
        component: TaskPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
