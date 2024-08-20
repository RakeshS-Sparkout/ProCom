import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private validNavigation = false;

  setValidNavigation(p0?: boolean): void {
    this.validNavigation = true;
  }

  isValidNavigation(): boolean {
    const isValid = this.validNavigation;
    this.validNavigation = false; // Reset after checking
    return isValid;
  }
}
