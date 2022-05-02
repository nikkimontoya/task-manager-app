import {Component, Input, OnInit} from '@angular/core';
import {NavbarService} from '../../services/navbar.service';
import {TopMenuActionInterface} from './types';
import {AuthService} from '../../../auth/services/auth.service';

@Component({
    selector: 'tm-top-menu',
    templateUrl: './top-menu.component.html',
    styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
    @Input() pageTitle: string;
    @Input() actions: TopMenuActionInterface[] = [];

    constructor(private authService: AuthService, public navbarService: NavbarService) {}

    ngOnInit(): void {}

    logout() {
        this.authService.logout();
    }
}
