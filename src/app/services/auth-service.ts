import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { User, Credentials, RegisterUser } from '../types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  currentUser!: User;

  login(credentials: Credentials): void {
    this.http
      .post(`${environment.AUTH_URL}/login`, JSON.stringify(credentials), {
        headers: { 'Content-Type': 'application/json' },
      })
      .subscribe((response: any) => {
        this.currentUser = response.data;
        localStorage.setItem(
          'project-tracker-angular',
          JSON.stringify(response.data)
        );
        this.router.navigate(['projects']);
      });
  }

  register(user: RegisterUser): void {
    this.http
      .post(`${environment.AUTH_URL}/register`, JSON.stringify(user), {
        headers: { 'Content-Type': 'application/json' },
      })
      .subscribe((response: any) => {
        this.currentUser = response.data;
        localStorage.setItem(
          'project-tracker-angular',
          JSON.stringify(response.data)
        );
        this.router.navigate(['projects']);
      });
  }
}
