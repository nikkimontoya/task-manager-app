import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'tm-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
    @Input() loading: boolean = false;
    @Input() error: string = null;

    constructor() {}

    ngOnInit(): void {}

    ngOnChanges() {
        console.log('loading: ', this.loading);
        console.log('error: ', this.error);
    }
}
