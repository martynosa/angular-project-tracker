import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from 'src/app/services/auth-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  error!: { status: boolean; message: string };

  constructor(private AuthService: AuthService) {}

  loginHandler(form: NgForm): void {
    if (!form.valid) return;

    this.AuthService.getError().subscribe((error) => (this.error = error));

    this.AuthService.login(form.value.email, form.value.password);
  }
}
