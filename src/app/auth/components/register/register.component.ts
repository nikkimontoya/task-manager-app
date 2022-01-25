import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {UserService} from '../../../shared/services/user.service';
import {Router} from '@angular/router';

@Component({
    selector: 'tm-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    form: FormGroup;
    error: string;

    constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {}

    ngOnInit(): void {
        this.initForm();
    }

    private initForm(): void {
        this.form = this.fb.group({
            username: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    submit() {
        this.error = null;
        if (!this.form.valid) {
            return;
        }

        this.userService.register(this.form.value).subscribe({
            next: () => {
                this.router.navigateByUrl('/');
            },
            error: (error: HttpErrorResponse) => {
                this.error = error.error.message;
            }
        });
    }
}
