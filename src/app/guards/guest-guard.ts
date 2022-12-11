import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {
  isGuest: boolean = true;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.getUser().subscribe((user) => {
      this.isGuest = !!!user;
    });
  }

  canActivate(): boolean {
    if (this.isGuest) {
      return true;
    } else {
      this.router.navigate(['/projects']);
      return false;
    }
  }
}
