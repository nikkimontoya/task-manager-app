import {NgModule, Provider} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthModule} from './auth/auth.module';
import {TasksModule} from './tasks/tasks.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './auth/interceptors/auth.interceptor';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {SharedModule} from './shared/shared.module';
import {ProjectsModule} from './projects/projects.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {GraphQLModule} from './graphql.module';

const INTERCEPTOR_PROVIDER: Provider = {
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: AuthInterceptor
};

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AuthModule,
        TasksModule,
        BrowserAnimationsModule,
        ToastModule,
        SharedModule,
        ProjectsModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        GraphQLModule,
        HttpClientModule
    ],
    providers: [INTERCEPTOR_PROVIDER, MessageService],
    bootstrap: [AppComponent]
})
export class AppModule {}
