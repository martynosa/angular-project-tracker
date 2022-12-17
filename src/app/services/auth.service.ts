import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { NotificationService } from './notification.service';
import { User } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  private currentUser$$ = new BehaviorSubject<User | null>(null);
  private isLoading$$ = new BehaviorSubject<boolean>(true);

  getUser(): Observable<User | null> {
    return this.currentUser$$;
  }

  isLoading(): Observable<boolean> {
    return this.isLoading$$;
  }

  login(email: string, password: string): void {
    this.isLoading$$.next(true);
    this.http
      .post(`${environment.AUTH_URL}/login`, { email, password })
      .subscribe({
        next: (response: any) => {
          this.currentUser$$.next(response.data);
          localStorage.setItem('angular', JSON.stringify(response.data));
          this.isLoading$$.next(false);
          this.notificationService.setNotification({
            status: true,
            type: 'success',
            message: 'Logged in sucessfully.',
          });
          this.router.navigate(['projects']);
        },
        error: (error) => {
          this.isLoading$$.next(false);
          this.notificationService.setNotification({
            status: true,
            type: 'error',
            message: error.error.message,
          });
        },
      });
  }

  register(
    email: string | null | undefined,
    name: string | null | undefined,
    password: string | null | undefined,
    rePassword: string | null | undefined
  ): void {
    this.isLoading$$.next(true);
    this.http
      .post(`${environment.AUTH_URL}/register`, {
        email,
        name,
        password,
        rePassword,
      })
      .subscribe({
        next: (response: any) => {
          this.currentUser$$.next(response.data);
          localStorage.setItem('angular', JSON.stringify(response.data));
          this.isLoading$$.next(false);
          this.notificationService.setNotification({
            status: true,
            type: 'success',
            message: 'Registered sucessfully.',
          });
          this.router.navigate(['projects']);
        },
        error: (error) => {
          this.isLoading$$.next(false);
          this.notificationService.setNotification({
            status: true,
            type: 'error',
            message: error.error.message,
          });
        },
      });
  }

  changePassword(
    password: string | null | undefined,
    newPassword: string | null | undefined,
    newRePassword: string | null | undefined
  ): void {
    this.isLoading$$.next(true);
    this.http
      .patch(`${environment.AUTH_URL}/updatePassword`, {
        password,
        newPassword,
        newRePassword,
      })
      .subscribe({
        next: (response: any) => {
          this.currentUser$$.next(response.data);
          localStorage.setItem('angular', JSON.stringify(response.data));
          this.isLoading$$.next(false);
          this.notificationService.setNotification({
            status: true,
            type: 'success',
            message: 'Password changed sucessfully.',
          });
        },
        error: (error) => {
          this.isLoading$$.next(false);
          this.notificationService.setNotification({
            status: true,
            type: 'error',
            message: error.error.message,
          });
        },
      });
  }

  logout(): void {
    localStorage.clear();
    this.currentUser$$.next(null);
    this.notificationService.setNotification({
      status: true,
      type: 'error',
      message: 'Logged out.',
    });
  }

  getPastUser(): void {
    this.isLoading$$.next(true);
    const pastUser = JSON.parse(localStorage.getItem('angular') || '{}');

    if (Object.keys(pastUser).length === 0) {
      this.currentUser$$.next(null);
      this.isLoading$$.next(false);
      return;
    }
    this.currentUser$$.next(pastUser);
    this.isLoading$$.next(false);
  }
}
