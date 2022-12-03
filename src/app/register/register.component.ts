import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../services/auth-service';
import { RegisterUser, User } from '../types';
import { matchPasswordsValidator } from '../validators/match-password-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
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

  currentUser!: User;

  registerHandler(): void {
    const user: RegisterUser = {
      email: this.form.value.email,
      name: this.form.value.name,
      password: this.form.value.passwords?.password,
      rePassword: this.form.value.passwords?.rePassword,
    };

    if (!this.form.valid) return;

    this.authService.register(user);
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}
}
