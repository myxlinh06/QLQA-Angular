import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators,ReactiveFormsModule } from '@angular/forms';
import { OrderService } from '../../order.service';
import { Order } from '../../types/Order';

@Component({
  selector: 'app-order-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit {
  orderId!: string;
  order!: Order;
  orderForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private orderService: OrderService
  ) {
    this.orderForm = this.fb.group({
      customerName: ['', Validators.required],
      orderDate: ['', Validators.required],
      productName: ['', Validators.required],
      productPrice: ['', Validators.required],
      quantity: ['', Validators.required],
      total: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.orderId = params['id'];
      this.loadOrderDetails(this.orderId);
    });
  }

  loadOrderDetails(id: string) {
    this.orderService.getById(id).subscribe({
      next: (order) => {
        this.order = order;
        this.populateForm(order);
      },
      error: (error) => {
        console.error('Error fetching order details:', error);
      }
    });
  }

  populateForm(order: Order) {
    this.orderForm.patchValue({
      customerName: order.customerName,
      orderDate: order.orderDate,
      productName: order.productName,
      productPrice: order.productPrice,
      quantity: order.quantity,
      total: order.total
    });
  }

  onSubmit() {
    if (this.orderForm.valid) {
      const updatedOrder: Order = {
        id: this.order.id,
        customerName: this.orderForm.value.customerName,
        orderDate: this.orderForm.value.orderDate,
        productName: this.orderForm.value.productName,
        productPrice: this.orderForm.value.productPrice,
        quantity: this.orderForm.value.quantity,
        total: this.orderForm.value.total
      };

      this.orderService.updateOrder(this.orderId, updatedOrder).subscribe({
        next: () => {
          alert('Cập nhật đơn hàng thành công');
          this.router.navigate(['/order/list']);
        },
        error: (error) => {
          console.error('Error updating order:', error);
        }
      });
    }
  }
}
