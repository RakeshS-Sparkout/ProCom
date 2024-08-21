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
    // this.productService.getProducts().subscribe(data => {
    //   this.products = data;
    // });
  }  

  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }
  
}
