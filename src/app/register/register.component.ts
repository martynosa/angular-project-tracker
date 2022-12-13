import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../services/auth-service';
import { RegisterCredentials } from '../types';
import { matchPasswordsValidator } from '../validators/match-password-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

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
    if (!this.form.valid) return;

    const registerCredentials: RegisterCredentials = {
      email: this.form.value.email,
      name: this.form.value.name,
      password: this.form.value.passwords?.password,
      rePassword: this.form.value.passwords?.rePassword,
    };

    this.authService.register(registerCredentials);
  }
}
