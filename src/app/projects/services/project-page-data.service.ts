import {Injectable} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {ProjectInterface} from '../types/project.interface';

@Injectable()
export class ProjectPageDataService {
    private project: Subject<ProjectInterface> = new BehaviorSubject<ProjectInterface>(null);
    project$: Observable<ProjectInterface> = this.project.asObservable();

    constructor(private route: ActivatedRoute) {
        this.route.data.subscribe((data) => this.project.next(data.project));
    }
}
