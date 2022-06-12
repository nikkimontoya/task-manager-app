import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectsListComponent} from './components/projects-list/projects-list.component';
import {ProjectsService} from './services/projects.service';
import {RouterModule, Routes} from '@angular/router';
import {ProjectPageComponent} from './components/project-page/project-page.component';
import {SharedModule} from '../shared/shared.module';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import ProjectResolver from './services/project.resolver';
import {MatTableModule} from '@angular/material/table';
import {TasksModule} from '../tasks/tasks.module';
import {ProjectsQuery} from './graphql/projects.query';
import {MatTabsModule} from '@angular/material/tabs';
import {ProjectParticipantsComponent} from './components/project-participants/project-participants.component';
import {ProjectTasksComponent} from './components/project-tasks/project-tasks.component';
import {ProjectDescriptionComponent} from './components/project-description/project-description.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'administrated',
        pathMatch: 'full'
    },
    {
        path: 'administrated',
        component: ProjectsListComponent
    },
    {
        path: ':id',
        component: ProjectPageComponent,
        children: [
            {
                path: '',
                redirectTo: 'participants',
                pathMatch: 'full'
            },
            {
                path: 'participants',
                component: ProjectParticipantsComponent
            },
            {
                path: 'tasks',
                component: ProjectTasksComponent
            },
            {
                path: 'description',
                component: ProjectDescriptionComponent
            }
        ],
        resolve: {
            project: ProjectResolver
        }
    }
];

@NgModule({
    declarations: [
        ProjectsListComponent,
        ProjectPageComponent,
        ProjectParticipantsComponent,
        ProjectTasksComponent,
        ProjectDescriptionComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        MatCardModule,
        MatButtonModule,
        MatTableModule,
        TasksModule,
        MatTabsModule
    ],
    exports: [RouterModule],
    providers: [ProjectsService, ProjectResolver, ProjectsQuery]
})
export class ProjectsModule {}
