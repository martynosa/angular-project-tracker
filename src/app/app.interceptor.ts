import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

import { User } from './interfaces';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {
    this.authService.getUser().subscribe((user) => {
      this.currentUser = user;
    });
  }

  currentUser!: User | null;

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      (req.url.includes('/items') || req.url.includes('/updatePassword')) &&
      this.currentUser !== null
    ) {
      req = req.clone({
        headers: req.headers.append('token', this.currentUser.token),
      });
    }

    return next.handle(req);
  }
}

export const appInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AppInterceptor,
  multi: true,
};
