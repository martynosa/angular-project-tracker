import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from 'src/app/services/auth-service';
import { User } from 'src/app/types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private AuthService: AuthService) {}

  currentUser!: User;

  loginHandler(form: NgForm): void {
    if (!form.valid) return;

    this.AuthService.login(form.value);
  }
}
