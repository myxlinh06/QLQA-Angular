// order.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from './types/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  apiUrl = `http://localhost:3000/orders`;
  http = inject(HttpClient);

  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}`);
  }
  getById(id: string): Observable<Order> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Order>(url);
  }

  addOrder(orderItems: Order[]): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, orderItems);
  }
  
  updateOrder(id: string, order: Order): Observable<Order> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Order>(url, order);
  }

  deleteOrder(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
