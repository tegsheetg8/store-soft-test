import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  subtotal: number;
}

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css'],
})
export class PosComponent implements OnInit {
  searchQuery: string = '';
  products: any[] = [];
  cart: CartItem[] = [];
  paidAmount: number = 0;
  totalAmount: number = 0;
  changeAmount: number = 0;
  loading: boolean = false;

  constructor(private apiService: ApiService, private authService: AuthService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.apiService.getProducts().subscribe({
      next: (data: any) => {
        this.products = data;
      },
      error: (err) => console.error('Error loading products:', err),
    });
  }

  searchProducts() {
    if (this.searchQuery.trim()) {
      this.apiService.getProducts(this.searchQuery).subscribe({
        next: (data: any) => {
          this.products = data;
        },
        error: (err) => console.error('Error searching products:', err),
      });
    } else {
      this.loadProducts();
    }
  }

  searchByBarcode() {
    if (this.searchQuery.trim()) {
      this.apiService.getProductByBarcode(this.searchQuery).subscribe({
        next: (product: any) => {
          if (product) {
            this.addToCart(product);
            this.searchQuery = '';
          }
        },
        error: (err) => console.error('Error searching by barcode:', err),
      });
    }
  }

  addToCart(product: any) {
    const existingItem = this.cart.find((item) => item.productId === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
      existingItem.subtotal = existingItem.quantity * existingItem.price;
    } else {
      this.cart.push({
        productId: product.id,
        name: product.name,
        price: product.salePrice,
        quantity: 1,
        unit: product.unit?.shortName || 'pcs',
        subtotal: product.salePrice,
      });
    }
    this.calculateTotal();
  }

  removeFromCart(index: number) {
    this.cart.splice(index, 1);
    this.calculateTotal();
  }

  updateQuantity(index: number, quantity: number) {
    if (quantity > 0) {
      this.cart[index].quantity = quantity;
      this.cart[index].subtotal = this.cart[index].quantity * this.cart[index].price;
      this.calculateTotal();
    }
  }

  calculateTotal() {
    this.totalAmount = this.cart.reduce((sum, item) => sum + item.subtotal, 0);
    this.calculateChange();
  }

  calculateChange() {
    this.changeAmount = Math.max(0, this.paidAmount - this.totalAmount);
  }

  processPayment() {
    if (this.cart.length === 0) {
      alert('Cart is empty');
      return;
    }
    if (this.paidAmount < this.totalAmount) {
      alert('Paid amount is less than total amount');
      return;
    }

    this.loading = true;
    const saleData = {
      items: this.cart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      })),
      paidAmount: this.paidAmount,
    };

    this.apiService.createSale(saleData).subscribe({
      next: (sale: any) => {
        alert('Sale completed successfully!');
        this.cart = [];
        this.paidAmount = 0;
        this.totalAmount = 0;
        this.changeAmount = 0;
        this.searchQuery = '';
        this.loading = false;
        // Optionally print receipt
        window.open(`http://localhost:3000/sales/${sale.id}/receipt`, '_blank');
      },
      error: (err) => {
        alert(err.error?.message || 'Error processing sale');
        this.loading = false;
      },
    });
  }
}

