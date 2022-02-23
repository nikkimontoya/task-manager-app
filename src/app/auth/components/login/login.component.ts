import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../shared/services/user.service';
import {Router} from '@angular/router';
import {MessagesService} from '../../../shared/services/messages.service';
import {HttpRequestState, httpRequestStates} from 'ngx-http-request-state';
import {Subscription} from 'rxjs';

@Component({
    selector: 'tm-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    form: FormGroup;
    subscriptions: Subscription[] = [];

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
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

        const sub = this.userService
            .login(this.form.value)
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
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
}
