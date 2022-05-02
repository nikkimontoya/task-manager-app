import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {HttpRequestState, httpRequestStates} from 'ngx-http-request-state';
import {Subscription} from 'rxjs';

import {MessagesService} from '../../../shared/services/messages.service';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'tm-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
    form: FormGroup;
    subscriptions: Subscription[] = [];

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private messagesService: MessagesService
    ) {}

    ngOnInit(): void {
        this.initForm();
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }

    submit(): void {
        if (!this.form.valid) {
            return;
        }

        const sub = this.authService
            .register(this.form.value)
            .pipe(httpRequestStates())
            .subscribe((requestState: HttpRequestState<any>) => {
                if (!requestState.isLoading && !requestState.error) {
                    this.router.navigateByUrl('/');
                } else if (requestState.error) {
                    this.messagesService.showError();
                }
            });

        this.subscriptions.push(sub);
    }

    private initForm(): void {
        this.form = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }
}
