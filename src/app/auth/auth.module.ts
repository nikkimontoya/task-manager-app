import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterComponent} from './components/register/register.component';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './components/login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {PrimengModule} from '../shared/primeng/primeng.module';

const routes: Routes = [
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    }
];

@NgModule({
    declarations: [RegisterComponent, LoginComponent],
    imports: [CommonModule, HttpClientModule, RouterModule.forChild(routes), ReactiveFormsModule, PrimengModule]
})
export class AuthModule {}
