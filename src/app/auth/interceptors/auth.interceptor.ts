import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserService} from '../../user/services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private userService: UserService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const currentUser = this.userService.getCurrentUser();
        if (currentUser) {
            request = request.clone({
                headers: request.headers.set('Authorization', `Bearer ${currentUser.accessToken}`)
            });
        }

        return next.handle(request);
    }
}
