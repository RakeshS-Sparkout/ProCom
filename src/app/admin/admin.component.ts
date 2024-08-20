import { Component, OnInit } from '@angular/core';
import { Product } from '../product/product';
import { ProductService } from '../product/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  products: any[] = [];

  constructor(private productService: ProductService, private router: Router) { }


  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  // toggleAccordion(productId: number): void {
  //   this.products = this.products.map(product => 
  //     product.id === productId 
  //       ? { ...product, showReviews: !product.showReviews } 
  //       : product
  //   );
  // }

  // sortProducts(criteria: string) {
  //   switch(criteria) {
  //     case 'alphabetical':
  //         this.products.sort((a, b) => a.title.localeCompare(b.title));
  //         break;
  //     case 'priceLowToHigh':
  //         this.products.sort((a, b) => a.price - b.price);
  //         break;
  //     case 'priceHighToLow':
  //         this.products.sort((a, b) => b.price - a.price);
  //         break;
  //     case 'highestRating':
  //         this.products.sort((a, b) => b.rating - a.rating);
  //         break;
  //     default:
  //         break;
  //   }
  // }

  // getProducts(){
  //   this.router.navigate(['admin/products'])
  // }
  
}
