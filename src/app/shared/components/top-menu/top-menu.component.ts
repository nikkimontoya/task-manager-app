import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {UserService} from '../../services/user.service';
import {NavbarService} from '../../services/navbar.service';

@Component({
    selector: 'tm-top-menu',
    templateUrl: './top-menu.component.html',
    styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
    @Input() pageTitle: string;

    constructor(private userService: UserService, public navbarService: NavbarService) {}

    ngOnInit(): void {}

    logout() {
        this.userService.logout();
    }
}
