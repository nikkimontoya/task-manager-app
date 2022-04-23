import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {ProjectInterface} from '../../types/project.interface';

@Component({
    selector: 'tm-project-page',
    templateUrl: './project-page.component.html',
    styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent implements OnInit, OnDestroy {
    subscriptions: Subscription[] = [];
    project: ProjectInterface;
    columnsToDisplay: string[] = ['name'];

    constructor(public activatedRoute: ActivatedRoute) {}

    ngOnInit(): void {
        const sub = this.activatedRoute.data.subscribe((data) => (this.project = data.project));
        this.subscriptions.push(sub);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }
}
