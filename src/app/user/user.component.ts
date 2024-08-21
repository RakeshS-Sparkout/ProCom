import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product/product.service';
import { CartService } from '../add_cart/cart.service';
import { Router } from '@angular/router';
import { NavigationService } from '../navigation/navigation.service';
import { Product } from '../product/product';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  products: any[] = [];

  stars: number[] = [0, 1, 2, 3, 4,];

  showReviewsMap: { [key: number]: boolean } = {};

  filteredProducts: Product[] = [];
  categories: string[] = ['Gadgets', 'Home Appliances'];
  selectedCategory: string = '';
  sortCriteria: string = '';

  priceRangeMin: number = 0;
  priceRangeMax: number = 500;
  minPrice: number = this.priceRangeMin;
  maxPrice: number = this.priceRangeMax;

  constructor(private productService: ProductService, private cartService: CartService, private router: Router, private navigationService: NavigationService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = this.products;
      this.updateCategories(); 
    });
    
  }

  toggleAccordion(productId: number): void {
    this.showReviewsMap[productId] = !this.showReviewsMap[productId];
  }
  
  sortProducts(criteria: string) {
    this.sortCriteria = criteria;
    this.applySorting();
  }

  applySorting() {
    switch(this.sortCriteria) {
      case 'alphabetical':
        this.filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'priceLowToHigh':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'priceHighToLow':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'highestRating':
        this.filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Default case if needed
        break;
    }
  }

  onPriceChange() {
    this.filteredProducts = this.products.filter(product =>
      product.price >= this.minPrice && product.price <= this.maxPrice
    );
  }

  

  /**
   * Determines whether add to cart on
   * @param product 
   */
  onAddToCart(product: any): void {
    this.cartService.addItem(product);
    console.log(product);
  }

  goToCart(): void {
    this.navigationService.setValidNavigation();
    this.router.navigate(['/cart']); // Adjust the route as necessary
  }

  selectCategory(category: string){
    this.selectedCategory = category;
    this.filterByCategory();
  }

  filterByCategory() {
    if (this.selectedCategory === ''){
      this.filteredProducts = this.products;
    }else {
      this.filteredProducts = this.products.filter(product => product.category === this.selectedCategory);
    }
    this.applySorting();
  }

  updateCategories() {
    // Update categories based on your product data if dynamic
    this.categories = Array.from(new Set(this.products.map(product => product.category)));
  }

}
