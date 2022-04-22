import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoaderComponent} from './components/loader/loader.component';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {UserService} from './services/user.service';
import {StorageService} from './services/storage.service';
import {TopMenuComponent} from './components/top-menu/top-menu.component';
import {MenubarModule} from 'primeng/menubar';
import {SharedModule as PrimeNgSharedModule} from 'primeng/api';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {NavbarComponent} from './components/navbar/navbar.component';
import {LayoutComponent} from './components/layout/layout.component';

@NgModule({
    declarations: [LoaderComponent, TopMenuComponent, NavbarComponent, LayoutComponent],
    providers: [UserService, StorageService],
    imports: [
        CommonModule,
        ProgressSpinnerModule,
        MenubarModule,
        PrimeNgSharedModule,
        ButtonModule,
        RippleModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatListModule
    ],
    exports: [LoaderComponent, TopMenuComponent, NavbarComponent, LayoutComponent]
})
export class SharedModule {}
