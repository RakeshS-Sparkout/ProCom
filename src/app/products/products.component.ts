import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: any[] = [];

  stars: number[] = [0, 1, 2, 3, 4]

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  addProduct(){
    this.router.navigate(['/add']);
  }

}
