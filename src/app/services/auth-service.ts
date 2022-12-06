import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { User, LoginCredentials, RegisterCredentials } from '../types';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  currentUser: User | null = null;

  currentUser$ = new Subject<User | null>();

  isAuth() {
    return !!this.currentUser;
  }

  login(loginCredentials: LoginCredentials): void {
    this.http
      .post(`${environment.AUTH_URL}/login`, loginCredentials)
      .subscribe((response: any) => {
        this.currentUser = response.data;
        this.currentUser$.next(this.currentUser);
        localStorage.setItem(
          'project-tracker-angular',
          JSON.stringify(response.data)
        );
        this.router.navigate(['projects']);
      });
  }

  register(registerCredentials: RegisterCredentials): void {
    this.http
      .post(`${environment.AUTH_URL}/register`, registerCredentials)
      .subscribe((response: any) => {
        this.currentUser = response.data;
        this.currentUser$.next(this.currentUser);
        localStorage.setItem(
          'project-tracker-angular',
          JSON.stringify(response.data)
        );
        this.router.navigate(['projects']);
      });
  }

  logout(): void {
    this.currentUser = null;
    this.currentUser$.next(this.currentUser);
    localStorage.clear();
  }
}
