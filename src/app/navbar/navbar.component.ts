import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../add_cart/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  cartItemCount: number = 0;

  showcartIcon = false;

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartCount$.subscribe(count => {
      this.cartItemCount = count;
    })

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
