import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { User, Credentials } from '../types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  currentUser!: User;

  login(credentials: Credentials): void {
    this.httpClient
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
}
