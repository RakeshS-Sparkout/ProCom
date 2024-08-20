import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['role'];
    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');

    if (user && user.role === expectedRole) {
      return true;
    } else {
      alert('You are not authorized to use!')
      return false;
    }
  }
}
