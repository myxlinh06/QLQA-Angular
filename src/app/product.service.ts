import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from './types/Products';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl = `http://localhost:3000/products`;
  http = inject(HttpClient);

  getAll() {
    return this.http.get<Product[]>(this.apiUrl);
  }
  getDetail(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
  addProduct(data: any) {
    return this.http.post(this.apiUrl,data);
  }
  editProduct(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
  deleteProduct(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  
}
