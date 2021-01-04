import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.checkUserLogin();
  }

  private checkUserLogin(): boolean {
    const user = this.authService.getUserFromLocalStorage();
    if (user) {
      return true;
    } else {
      this.router.navigateByUrl('');
      return false;
    }
  }
}
