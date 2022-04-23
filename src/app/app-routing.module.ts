import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth/guards/auth.guard';
import {TaskPageComponent} from './tasks/components/task-page/task-page.component';
import TaskResolver from './tasks/services/task.resolver';
import {TaskListPageComponent} from './tasks/components/task-list-page/task-list-page.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/tasks',
        pathMatch: 'full'
    },
    {
        path: 'tasks',
        component: TaskListPageComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'tasks/:id',
        component: TaskPageComponent,
        resolve: {
            task: TaskResolver
        }
    },
    {
        path: 'projects',
        loadChildren: () => import('./projects/projects.module').then((m) => m.ProjectsModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
