import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../../product.service';
import { Product } from '../../types/Products';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone:true,
  imports:[RouterLink],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  productService = inject(ProductService);
  trackByProductId(index: number, product: any): number {
    return product.id;
  }
  ngOnInit() {
    this.productService.getAll().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error) => {
        // show error
        console.error(error.message);
      },
    });
  }
  handleDelete(id: string) {
    if (window.confirm('Xoa that nhe')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.products = this.products.filter((product) => product.id !== id);
        },
        error: (error) => {
          console.error(error.message);
        },
      });
    }
  }
}