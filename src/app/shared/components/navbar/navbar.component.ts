import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../user/services/user.service';
import {UserInterface} from '../../../user/types/user.interface';
import {NavbarService} from '../../services/navbar.service';
import {AuthService} from '../../../auth/services/auth.service';

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

    constructor(
        public userService: UserService,
        public navbarService: NavbarService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.user = this.userService.getCurrentUser();
    }

    logout() {
        this.navbarService.close();
        this.authService.logout();
    }
}
