import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from 'src/app/services/auth-service';
import { NotificationService } from '../services/notification.service';
import { Notification } from '../types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  notification!: Notification;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  loginHandler(form: NgForm): void {
    if (!form.valid) return;

    this.authService.login(form.value.email, form.value.password);
  }

  ngOnInit(): void {
    this.notificationService
      .getNotification()
      .subscribe((notification) => (this.notification = notification));
  }
}
