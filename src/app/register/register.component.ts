import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../services/auth-service';
import { matchPasswordsValidator } from '../validators/match-password-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  error!: { status: boolean; message: string };

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

    this.authService.register(
      this.form.value.email,
      this.form.value.name,
      this.form.value.passwords?.password,
      this.form.value.passwords?.rePassword
    );
  }

  ngOnInit(): void {
    this.authService.getError().subscribe((error) => (this.error = error));
  }
}
