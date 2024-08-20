import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product/product.service';
import { CartService } from '../add_cart/cart.service';
import { Router } from '@angular/router';
import { NavigationService } from '../navigation/navigation.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService, private cartService: CartService, private router: Router, private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  toggleAccordion(productId: number): void {
    this.products = this.products.map(product => 
      product.id === productId 
        ? { ...product, showReviews: !product.showReviews } 
        : product
    );
  }

  sortProducts(criteria: string) {
    switch(criteria) {
      case 'alphabetical':
          this.products.sort((a, b) => a.title.localeCompare(b.title));
          break;
      case 'priceLowToHigh':
          this.products.sort((a, b) => a.price - b.price);
          break;
      case 'priceHighToLow':
          this.products.sort((a, b) => b.price - a.price);
          break;
      case 'highestRating':
          this.products.sort((a, b) => b.rating - a.rating);
          break;
      default:
          // Default case if needed
          break;
    }
  }

  /**
   * Determines whether add to cart on
   * @param product 
   */
  onAddToCart(product: any): void {
    this.cartService.addItem(product);
    console.log(product);
    this.router.navigate(['/cart']).then(success => {
      if (success) {
        console.log('Navigation Successful');
      }else {
        console.log('Navigation Failed');
      }
    });
  }

  goToCart(): void {
    this.navigationService.setValidNavigation();
    this.router.navigate(['/cart']); // Adjust the route as necessary
  }

}
