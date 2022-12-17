import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { matchPasswordsValidator } from 'src/app/validators/match-password-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  isLoading!: boolean;

  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required, Validators.minLength(3)]],
    passwords: this.formBuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        rePassword: [''],
      },
      { validators: [matchPasswordsValidator('password', 'rePassword')] }
    ),
  });

  registerHandler(): void {
    if (!this.form.valid) {
      this.notificationService.setNotification({
        status: true,
        type: 'error',
        message: 'Please fill in the form!',
      });
      return;
    }

    this.authService.register(
      this.form.value.email,
      this.form.value.name,
      this.form.value.passwords?.password,
      this.form.value.passwords?.rePassword
    );
  }

  ngOnInit(): void {
    this.authService
      .isLoading()
      .subscribe((isLoading) => (this.isLoading = isLoading));
  }
}
