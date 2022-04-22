import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {UserInterface} from '../../types/user.interface';

@Component({
    selector: 'tm-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    user: UserInterface;
    items = [
        {
            title: 'Projects',
            link: '/projects',
            icon: 'work'
        },
        {
            title: 'Tasks',
            link: '/tasks',
            icon: 'article'
        }
    ];

    constructor(public userService: UserService) {}

    ngOnInit(): void {
        this.user = this.userService.getCurrentUser();
    }
}
