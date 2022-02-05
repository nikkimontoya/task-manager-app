import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoaderComponent} from './components/loader/loader.component';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {UserService} from './services/user.service';
import {StorageService} from './services/storage.service';

@NgModule({
    declarations: [LoaderComponent],
    providers: [UserService, StorageService],
    imports: [CommonModule, ProgressSpinnerModule],
    exports: [LoaderComponent]
})
export class SharedModule {}
