import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import {
  User,
  LoginCredentials,
  RegisterCredentials,
  changePasswordCredentials,
} from '../types';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  private currentUser$ = new BehaviorSubject<User | null>(null);
  private isLoading$ = new BehaviorSubject<boolean>(true);

  getUser(): Observable<User | null> {
    return this.currentUser$;
  }

  isLoading(): Observable<boolean> {
    return this.isLoading$;
  }

  login(loginCredentials: LoginCredentials): void {
    this.http
      .post(`${environment.AUTH_URL}/login`, loginCredentials)
      .subscribe((response: any) => {
        this.currentUser$.next(response.data);
        localStorage.setItem('angular', JSON.stringify(response.data));
        this.isLoading$.next(false);
        this.router.navigate(['projects']);
      });
  }

  register(registerCredentials: RegisterCredentials): void {
    this.http
      .post(`${environment.AUTH_URL}/register`, registerCredentials)
      .subscribe((response: any) => {
        this.currentUser$.next(response.data);
        localStorage.setItem('angular', JSON.stringify(response.data));
        this.isLoading$.next(false);
        this.router.navigate(['projects']);
      });
  }

  changePassword(changePasswordCredentials: changePasswordCredentials): void {
    this.http
      .patch(
        `${environment.AUTH_URL}/updatePassword`,
        changePasswordCredentials
      )
      .subscribe((response: any) => {
        this.currentUser$.next(response.data);
        localStorage.setItem('angular', JSON.stringify(response.data));
        this.isLoading$.next(false);
      });
  }

  logout(): void {
    localStorage.clear();
    this.currentUser$.next(null);
    this.isLoading$.next(false);
  }

  getPastUser(): void {
    const pastUser = JSON.parse(localStorage.getItem('angular') || '{}');

    if (Object.keys(pastUser).length === 0) {
      this.currentUser$.next(null);
      this.isLoading$.next(false);
      return;
    }
    this.currentUser$.next(pastUser);
    this.isLoading$.next(false);
  }
}
