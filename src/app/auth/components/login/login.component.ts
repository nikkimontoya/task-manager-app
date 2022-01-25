import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../shared/services/user.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'tm-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    error: string;

    constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {}

    ngOnInit(): void {
        this.initForm();
    }

    submit(): void {
        this.error = null;
        if (!this.form.valid) {
            return;
        }

        this.userService.login(this.form.value).subscribe({
            next: () => {
                this.router.navigateByUrl('/');
            },
            error: (error: HttpErrorResponse) => {
                this.error = error.error.message;
            }
        });
    }

    private initForm(): void {
        this.form = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
}
