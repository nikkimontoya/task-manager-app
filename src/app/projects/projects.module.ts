import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectsListComponent} from './components/projects-list/projects-list.component';
import {ProjectsService} from './services/projects.service';
import {RouterModule, Routes} from '@angular/router';
import {CardModule} from 'primeng/card';
import {ProjectPageComponent} from './components/project-page/project-page.component';
import {ProjectComponent} from './components/project/project.component';
import {SharedModule} from '../shared/shared.module';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

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
        component: ProjectPageComponent
    }
];

@NgModule({
    declarations: [ProjectsListComponent, ProjectPageComponent, ProjectComponent],
    imports: [CommonModule, RouterModule.forChild(routes), CardModule, SharedModule, MatCardModule, MatButtonModule],
    exports: [RouterModule],
    providers: [ProjectsService]
})
export class ProjectsModule {}
