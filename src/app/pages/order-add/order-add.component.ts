import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { ProductService } from '../../product.service'; // Thay thế bằng ProductService của bạn
import { OrderService } from '../../order.service'; // Thay thế bằng OrderService của bạn
import { Product } from '../../types/Products'; // Kiểu dữ liệu Product
import { Order } from '../../types/Order'; // Kiểu dữ liệu Order
import { Router, RouterLink } from '@angular/router'; // Import Router
import { CommonModule } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';



@Component({
  selector: 'app-order-add',
  standalone : true,
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css'],
  imports: [ReactiveFormsModule, RouterLink, CommonModule],

})
export class OrderAddComponent implements OnInit {
  orderForm: FormGroup;
  products: Product[] = [];
  orderItems: Order[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router
  ) {
    this.orderForm = this.fb.group({
      customerName: ['', Validators.required],
      orderDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.productService.getAll().subscribe(products => {
      this.products = products;
    });
  }

  addToOrder(product: Product): void {
    const formValue = this.orderForm.value;
    const newOrderItem: Order = {
      id: uuidv4(), // Thêm một id tạm thời, hoặc có thể để trống nếu id được sinh tự động bởi server
      productName: product.title,
      productPrice: product.price,
      quantity: 1,
      total: product.price,
      customerName: formValue.customerName,
      orderDate: formValue.orderDate
    };

    this.orderItems.push(newOrderItem);
    this.calculateTotal();
  }

  removeFromOrder(index: number): void {
    this.orderItems.splice(index, 1);
    this.calculateTotal();
  }

  calculateTotal(): void {
    let total = 0;
    this.orderItems.forEach(item => {
      item.total = item.productPrice * item.quantity;
      total += item.total;
    });
  }

  onSubmit(): void {
    if (this.orderForm.valid && this.orderItems.length > 0) {
      this.orderService.addOrder(this.orderItems).subscribe({
        next: () => {
          alert('Đã thêm đơn hàng thành công');
          this.router.navigate(['/order/list']);
        },
        error: (error) => {
          console.error('Lỗi khi thêm đơn hàng:', error);
        }
      });
    }
  }
}
