import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/product/product';
import { ProductService } from 'src/app/product/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  productForm: FormGroup;

  constructor(private router: Router, private productService: ProductService) {
    this.productForm = new FormGroup({
      image: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      discount: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      rating: new FormControl('', [Validators.required, Validators.min(0), Validators.max(5)]),
      category: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.productService.addProduct(this.productForm.value).subscribe(
        response => {
          console.log('Product added successfully:', response);
          // Reset the form after successful submission
          this.productForm.reset();
          this.router.navigate(['/admin']);
        },
        error => {
          console.error('Error adding product:', error);
        }
      );
    }
  }
}
