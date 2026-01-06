import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Auth
  login(username: string, password: string) {
    return this.http.post(`${this.apiUrl}/auth/login`, { username, password });
  }

  // Users
  getUsers() {
    return this.http.get(`${this.apiUrl}/users`);
  }

  getUser(id: number) {
    return this.http.get(`${this.apiUrl}/users/${id}`);
  }

  createUser(user: any) {
    return this.http.post(`${this.apiUrl}/users`, user);
  }

  updateUser(id: number, user: any) {
    return this.http.patch(`${this.apiUrl}/users/${id}`, user);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }

  // Categories
  getCategories() {
    return this.http.get(`${this.apiUrl}/categories`);
  }

  getCategory(id: number) {
    return this.http.get(`${this.apiUrl}/categories/${id}`);
  }

  createCategory(category: any) {
    return this.http.post(`${this.apiUrl}/categories`, category);
  }

  updateCategory(id: number, category: any) {
    return this.http.patch(`${this.apiUrl}/categories/${id}`, category);
  }

  deleteCategory(id: number) {
    return this.http.delete(`${this.apiUrl}/categories/${id}`);
  }

  // Units
  getUnits() {
    return this.http.get(`${this.apiUrl}/units`);
  }

  getUnit(id: number) {
    return this.http.get(`${this.apiUrl}/units/${id}`);
  }

  createUnit(unit: any) {
    return this.http.post(`${this.apiUrl}/units`, unit);
  }

  updateUnit(id: number, unit: any) {
    return this.http.patch(`${this.apiUrl}/units/${id}`, unit);
  }

  deleteUnit(id: number) {
    return this.http.delete(`${this.apiUrl}/units/${id}`);
  }

  // Products
  getProducts(search?: string) {
    const url = search
      ? `${this.apiUrl}/products?search=${encodeURIComponent(search)}`
      : `${this.apiUrl}/products`;
    return this.http.get(url);
  }

  getProduct(id: number) {
    return this.http.get(`${this.apiUrl}/products/${id}`);
  }

  getProductByBarcode(barcode: string) {
    return this.http.get(`${this.apiUrl}/products/barcode/${barcode}`);
  }

  createProduct(product: any) {
    return this.http.post(`${this.apiUrl}/products`, product);
  }

  updateProduct(id: number, product: any) {
    return this.http.patch(`${this.apiUrl}/products/${id}`, product);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.apiUrl}/products/${id}`);
  }

  // Suppliers
  getSuppliers() {
    return this.http.get(`${this.apiUrl}/suppliers`);
  }

  getSupplier(id: number) {
    return this.http.get(`${this.apiUrl}/suppliers/${id}`);
  }

  createSupplier(supplier: any) {
    return this.http.post(`${this.apiUrl}/suppliers`, supplier);
  }

  updateSupplier(id: number, supplier: any) {
    return this.http.patch(`${this.apiUrl}/suppliers/${id}`, supplier);
  }

  deleteSupplier(id: number) {
    return this.http.delete(`${this.apiUrl}/suppliers/${id}`);
  }

  // Stock In
  getStockIns() {
    return this.http.get(`${this.apiUrl}/stock/in`);
  }

  getStockIn(id: number) {
    return this.http.get(`${this.apiUrl}/stock/in/${id}`);
  }

  createStockIn(stockIn: any) {
    return this.http.post(`${this.apiUrl}/stock/in`, stockIn);
  }

  // Stock Out
  getStockOuts() {
    return this.http.get(`${this.apiUrl}/stock/out`);
  }

  getStockOut(id: number) {
    return this.http.get(`${this.apiUrl}/stock/out/${id}`);
  }

  createStockOut(stockOut: any) {
    return this.http.post(`${this.apiUrl}/stock/out`, stockOut);
  }

  // Stock Taking
  getStockTakings() {
    return this.http.get(`${this.apiUrl}/stock/taking`);
  }

  getStockTaking(id: number) {
    return this.http.get(`${this.apiUrl}/stock/taking/${id}`);
  }

  createStockTaking(stockTaking: any) {
    return this.http.post(`${this.apiUrl}/stock/taking`, stockTaking);
  }

  // Sales
  getSales(startDate?: string, endDate?: string) {
    let url = `${this.apiUrl}/sales`;
    const params: string[] = [];
    if (startDate) params.push(`startDate=${encodeURIComponent(startDate)}`);
    if (endDate) params.push(`endDate=${encodeURIComponent(endDate)}`);
    if (params.length > 0) url += '?' + params.join('&');
    return this.http.get(url);
  }

  getSale(id: number) {
    return this.http.get(`${this.apiUrl}/sales/${id}`);
  }

  createSale(sale: any) {
    return this.http.post(`${this.apiUrl}/sales`, sale);
  }

  getReceipt(id: number) {
    return this.http.get(`${this.apiUrl}/sales/${id}/receipt`, { responseType: 'text' });
  }

  // Reports
  getSalesReport(startDate: string, endDate: string) {
    return this.http.get(
      `${this.apiUrl}/reports/sales?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`,
    );
  }

  getStockBalanceReport() {
    return this.http.get(`${this.apiUrl}/reports/stock-balance`);
  }

  getLowStockReport() {
    return this.http.get(`${this.apiUrl}/reports/low-stock`);
  }
}

