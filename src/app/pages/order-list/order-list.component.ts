import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../order.service';
import { Order } from '../../types/Order';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getAll().subscribe({
      next: (orders) => {
        this.orders = orders;
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
      },
    });
  }

  handleDelete(id: string) {
    if (window.confirm('Xóa đơn hàng này?')) {
      this.orderService.deleteOrder(id).subscribe({
        next: () => {
          this.orders = this.orders.filter((order) => order.id !== id);
        },
        error: (error) => {
          console.error('Error deleting order:', error);
        },
      });
    }
  }

  navigateToEdit(id: string) {
    this.router.navigate(['/order/edit', id]);
  }
}
