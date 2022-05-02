import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../user/services/user.service';
import {NavbarService} from '../../services/navbar.service';

@Component({
    selector: 'tm-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
    constructor(public navbarService: NavbarService, public userService: UserService) {}

    ngOnInit(): void {}
}
