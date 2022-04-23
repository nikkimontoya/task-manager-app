import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectsListComponent} from './components/projects-list/projects-list.component';
import {ProjectsService} from './services/projects.service';
import {RouterModule, Routes} from '@angular/router';
import {CardModule} from 'primeng/card';
import {ProjectPageComponent} from './components/project-page/project-page.component';
import {SharedModule} from '../shared/shared.module';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import ProjectResolver from './services/project.resolver';
import {MatTableModule} from '@angular/material/table';
import {TasksModule} from '../tasks/tasks.module';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/projects/administrated',
        pathMatch: 'full'
    },
    {
        path: 'administrated',
        component: ProjectsListComponent
    },
    {
        path: ':id',
        component: ProjectPageComponent,
        resolve: {
            project: ProjectResolver
        }
    }
];

@NgModule({
    declarations: [ProjectsListComponent, ProjectPageComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        CardModule,
        SharedModule,
        MatCardModule,
        MatButtonModule,
        MatTableModule,
        TasksModule
    ],
    exports: [RouterModule],
    providers: [ProjectsService, ProjectResolver]
})
export class ProjectsModule {}
