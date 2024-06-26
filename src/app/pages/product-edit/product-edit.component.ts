import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../product.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss'
})
export class ProductEditComponent {
  productService = inject(ProductService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  productId!: string | undefined;
  editProductForm: FormGroup = new FormGroup({
    // FormControl : gia tri ban dau, Validator
    title: new FormControl('', [Validators.required, Validators.minLength(6)]),
    image: new FormControl('', []),
    category: new FormControl('', [Validators.required]),
  });
  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.productId = param['id'];
      this.productService.getDetail(param['id']).subscribe({
        next: (data) => {
          // update data vao addProductForm
          this.editProductForm.patchValue(data);
        },
        error: (error) => {
          // show thong bao error
          console.error(error);
        },
      });
    });
  }
  handleSubmit() {
    console.log(this.editProductForm);
    if (!this.productId) return;
    this.productService
      .editProduct(this.productId, this.editProductForm.value)
      .subscribe({
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