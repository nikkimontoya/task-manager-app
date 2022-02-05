import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TaskListComponent} from './tasks/components/task-list/task-list.component';
import {AuthGuard} from './auth/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: TaskListComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
