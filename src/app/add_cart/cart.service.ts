import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface CartProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image?: string;
  imageUrlDark?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartProduct[] = [];
  private cartItemCount = new BehaviorSubject<number>(0);

  constructor() {}

  getCartItems(): CartProduct[] {
    return this.cartItems;
  }

  cartCount$ = this.cartItemCount.asObservable();

  addItem(product: CartProduct): void {
    const existingProduct = this.cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += product.quantity;
    } else {
      this.cartItems.push(product);
      this.updateCartCount()
    }
  }

  updateItem(updatedProduct: CartProduct): void {
    const index = this.cartItems.findIndex(product => product.id === updatedProduct.id);
    if (index !== -1) {
      this.cartItems[index] = updatedProduct;
    }
  }

  removeItem(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.updateCartCount();
  }

  private updateCartCount() {
    this.cartItemCount.next(this.cartItems.length);
  }
}
