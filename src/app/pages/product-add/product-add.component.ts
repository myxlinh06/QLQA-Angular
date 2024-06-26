import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../product.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent {
  productService = inject(ProductService);
  private router = inject(Router);
  addProductForm: FormGroup = new FormGroup({
    // FormControl : gia tri ban dau, Validator
    title: new FormControl('', [Validators.required, Validators.minLength(6)]),
    image: new FormControl('', []),
    category: new FormControl('', [Validators.required]),
  });
  handleSubmit() {
    console.log(this.addProductForm);
    this.productService.addProduct(this.addProductForm.value).subscribe({
      next: (data) => {
        console.log(data);
        alert('Add OK');
        this.router.navigate(['/product/list']);
      },
      error: (error) => {
        // show error
        console.error(error.message);
      },
    });
  }
}