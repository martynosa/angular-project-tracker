import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service.service';

import { User, Credentials } from 'src/app/types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private AuthService: AuthService) {}

  currentUser!: User;

  testCredentials: Credentials = {
    email: 'marty@abv.bg',
    password: '1234567',
  };

  loginHandler(): any {
    this.AuthService.login(this.testCredentials);
  }

  ngOnInit(): void {}
}
