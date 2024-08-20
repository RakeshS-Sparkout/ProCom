import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  showcartIcon = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      const currentUrl = this.router.url;

      this.showcartIcon = currentUrl.includes('/user');
    })
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }

  goToCart(){
    this.router.navigate(['/cart']);
  }

}
