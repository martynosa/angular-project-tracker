import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from 'src/app/services/auth-service';
import { LoginCredentials } from 'src/app/types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private AuthService: AuthService) {}

  loginHandler(form: NgForm): void {
    if (!form.valid) return;

    const loginCredentials: LoginCredentials = { ...form.value };

    this.AuthService.login(loginCredentials);
  }
}
