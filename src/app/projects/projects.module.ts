import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectsListComponent} from './components/projects-list/projects-list.component';
import {ProjectsService} from './services/projects.service';
import {RouterModule, Routes} from '@angular/router';
import {CardModule} from 'primeng/card';
import {ProjectPageComponent} from './components/project-page/project-page.component';

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
    declarations: [ProjectsListComponent, ProjectPageComponent],
    imports: [CommonModule, RouterModule.forChild(routes), CardModule],
    exports: [RouterModule],
    providers: [ProjectsService]
})
export class ProjectsModule {}
