import { Component, OnInit } from '@angular/core';
import { CartService } from '../add_cart/cart.service';
import { Router } from '@angular/router';

interface CartProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image?: string;
  imageUrlDark?: string;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartProducts: CartProduct[] = [];

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartProducts = this.cartService.getCartItems(); // Retrieve cart items from the service
    console.log('Cart Products:', this.cartProducts); 
  }

  calculateTotal(): number {
    let total = 0;
    for (const product of this.cartProducts) {
      if (product.quantity && !isNaN(product.quantity)) {
        console.log('Product Quantity:'+product.quantity + 'and' + 'Product Price:'+ product.price);
        total += product.price * product.quantity;
      }
    }
    return total;
  }  

  incrementQuantity(product: CartProduct): void {
    if (product.quantity !== undefined) {
      product.quantity += 1;
      this.updateCart(product);
    }
  }

  decrementQuantity(product: CartProduct): void {
    if (product.quantity !== undefined && product.quantity > 1) {
      product.quantity -= 1;
      this.updateCart(product);
    }
  }

  updateCart(product: CartProduct): void {
    this.cartService.updateItem(product); // Update the item in the cart service
    this.cartProducts = this.cartService.getCartItems(); // Refresh cart items
  }

  removeFromCart(productId: number): void {
    this.cartService.removeItem(productId);
    this.cartProducts = this.cartService.getCartItems(); // Refresh cart items after removal
  }

  proceedToCheckout(): void {
    // Add your checkout logic here
  }

  goToProducts() {
    this.router.navigate(['/user']);
  }
}
