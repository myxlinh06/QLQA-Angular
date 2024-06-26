import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../product.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../../types/Products';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  route = inject(ActivatedRoute);
  productService = inject(ProductService);
  product: Product | undefined;
  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.productService.getDetail(param['id']).subscribe({
        next: (data) => {
          this.product = data;
        },
        error: (error) => {
          console.error(error);
        },
      });
    });
  }
}
