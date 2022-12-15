import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { User } from '../types';
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

  login(email: string, password: string): void {
    this.http
      .post(`${environment.AUTH_URL}/login`, { email, password })
      .subscribe((response: any) => {
        this.currentUser$.next(response.data);
        localStorage.setItem('angular', JSON.stringify(response.data));
        this.isLoading$.next(false);
        this.router.navigate(['projects']);
      });
  }

  register(
    email: string | null | undefined,
    name: string | null | undefined,
    password: string | null | undefined,
    rePassword: string | null | undefined
  ): void {
    this.http
      .post(`${environment.AUTH_URL}/register`, {
        email,
        name,
        password,
        rePassword,
      })
      .subscribe((response: any) => {
        this.currentUser$.next(response.data);
        localStorage.setItem('angular', JSON.stringify(response.data));
        this.isLoading$.next(false);
        this.router.navigate(['projects']);
      });
  }

  changePassword(
    password: string | null | undefined,
    newPassword: string | null | undefined,
    newRePassword: string | null | undefined
  ): void {
    this.http
      .patch(`${environment.AUTH_URL}/updatePassword`, {
        password,
        newPassword,
        newRePassword,
      })
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
