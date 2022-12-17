import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  loginHandler(form: NgForm): void {
    if (!form.valid) {
      this.notificationService.setNotification({
        status: true,
        type: 'error',
        message: 'Please fill in the form!',
      });
      return;
    }

    this.authService.login(form.value.email, form.value.password);
  }
}
