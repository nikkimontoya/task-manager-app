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

@NgModule({
    declarations: [LoaderComponent, TopMenuComponent],
    providers: [UserService, StorageService],
    imports: [CommonModule, ProgressSpinnerModule, MenubarModule, PrimeNgSharedModule, ButtonModule, RippleModule],
    exports: [LoaderComponent, TopMenuComponent]
})
export class SharedModule {}
