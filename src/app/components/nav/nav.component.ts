import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  currentUser!: User | null;

  logoutHandler(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe((user) => {
      this.currentUser = user;
    });
  }
}
