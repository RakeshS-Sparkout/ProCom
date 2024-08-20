import { Injectable } from '@angular/core';

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

  constructor() {}

  getCartItems(): CartProduct[] {
    return this.cartItems;
  }

  addItem(product: CartProduct): void {
    const existingProduct = this.cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += product.quantity;
    } else {
      this.cartItems.push(product);
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
  }
}
