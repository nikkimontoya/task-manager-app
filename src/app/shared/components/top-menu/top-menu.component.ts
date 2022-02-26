import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {UserService} from '../../services/user.service';

@Component({
    selector: 'tm-top-menu',
    templateUrl: './top-menu.component.html',
    styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
    items: MenuItem[];

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        this.items = [
            {
                label: 'Tasks',
                routerLink: ['/tasks']
            }
        ];
    }

    logout() {
        this.userService.logout();
    }
}
