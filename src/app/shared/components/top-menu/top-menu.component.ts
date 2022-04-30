import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {NavbarService} from '../../services/navbar.service';
import {TopMenuActionInterface} from './types';

@Component({
    selector: 'tm-top-menu',
    templateUrl: './top-menu.component.html',
    styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
    @Input() pageTitle: string;
    @Input() actions: TopMenuActionInterface[] = [];

    constructor(private userService: UserService, public navbarService: NavbarService) {}

    ngOnInit(): void {}

    logout() {
        this.userService.logout();
    }
}
