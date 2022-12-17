import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from 'src/app/services/auth-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  error!: { status: boolean; message: string };

  constructor(private authService: AuthService) {}

  loginHandler(form: NgForm): void {
    if (!form.valid) return;

    this.authService.login(form.value.email, form.value.password);
  }

  ngOnInit(): void {
    this.authService.getError().subscribe((error) => (this.error = error));
  }
}
