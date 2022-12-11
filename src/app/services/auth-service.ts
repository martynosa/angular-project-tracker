import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { User, LoginCredentials, RegisterCredentials } from '../types';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  currentUser!: User | null;

  private currentUser$ = new BehaviorSubject<User | null>(null);

  isAuth() {
    return !!this.currentUser;
  }

  getUser(): Observable<User | null> {
    return this.currentUser$;
  }

  login(loginCredentials: LoginCredentials): void {
    this.http
      .post(`${environment.AUTH_URL}/login`, loginCredentials)
      .subscribe((response: any) => {
        localStorage.setItem('angular', JSON.stringify(response.data));
        this.currentUser = response.data;
        this.currentUser$.next(response.data);
        this.router.navigate(['projects']);
      });
  }

  register(registerCredentials: RegisterCredentials): void {
    this.http
      .post(`${environment.AUTH_URL}/register`, registerCredentials)
      .subscribe((response: any) => {
        localStorage.setItem('angular', JSON.stringify(response.data));
        this.currentUser = response.data;
        this.currentUser$.next(response.data);
        this.router.navigate(['projects']);
      });
  }

  logout(): void {
    localStorage.clear();
    this.currentUser = null;
    this.currentUser$.next(null);
  }

  getPastUser(): void {
    const pastUser = JSON.parse(localStorage.getItem('angular') || '{}');

    if (Object.keys(pastUser).length === 0) {
      this.currentUser = null;
      this.currentUser$.next(null);
      return;
    }

    this.currentUser = pastUser;
    this.currentUser$.next(pastUser);
  }
}
