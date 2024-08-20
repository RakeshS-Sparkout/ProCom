import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NavigationService } from '../navigation/navigation.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private navigationService: NavigationService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = localStorage.getItem('loggedInUser');
    const isLoginOrRegister = state.url === '/login' || state.url === '/register';

    if (user) {
      if (isLoginOrRegister) {
        this.router.navigate(['/user']);
        return false;
      }

      if (this.navigationService.isValidNavigation()) {
        this.navigationService.setValidNavigation(false); // Reset after valid navigation
        return true;
      } else {
        this.router.navigate(['/user']); // Or redirect to a valid route
        return false;
      }
    } else {
      if (isLoginOrRegister) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }
  }
}
