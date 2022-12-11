import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth-service';

import { User } from './types';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  currentUser!: User | null;

  constructor(private authService: AuthService) {
    this.authService.getUser().subscribe((user) => {
      this.currentUser = user;
    });
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.includes('/items') && this.currentUser !== null) {
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
