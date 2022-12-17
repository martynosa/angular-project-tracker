import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  isAuth: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.getUser().subscribe((user) => {
      this.isAuth = !!user;
    });
  }

  canActivate(): boolean {
    if (this.isAuth) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
