import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../shared/services/user.service';
import {Router} from '@angular/router';

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

    async submit(): Promise<void> {
        this.error = null;
        if (!this.form.valid) {
            return;
        }

        try {
            await this.userService.login(this.form.value);
            await this.router.navigateByUrl('/');
        } catch (error) {
            this.error = error.error.message;
        }
    }

    private initForm(): void {
        this.form = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
}
