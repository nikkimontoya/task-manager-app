import {Component} from '@angular/core';
import {NavbarService} from '../../services/navbar.service';
import {TopMenuService} from '../../services/top-menu.service';

@Component({
    selector: 'tm-top-menu',
    templateUrl: './top-menu.component.html',
    styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent {
    constructor(public navbarService: NavbarService, public topMenuService: TopMenuService) {}
}
