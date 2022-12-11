import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth-service';
import { User } from '../types';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(private authService: AuthService) {}

  currentUser: User | null = null;

  ngOnInit(): void {}
}
