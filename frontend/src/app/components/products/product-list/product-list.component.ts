import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "../../../services/api.service";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent implements OnInit {
  products: any[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.apiService.getProducts().subscribe({
      next: (data: any) => {
        this.products = data;
      },
      error: (err) => console.error("Error loading products:", err),
    });
  }

  edit(id: number) {
    this.router.navigate(["/products/edit", id]);
  }

  delete(id: number) {
    if (confirm("Are you sure you want to delete this product?")) {
      this.apiService.deleteProduct(id).subscribe({
        next: () => this.loadProducts(),
        error: (err) => alert("Error deleting product"),
      });
    }
  }
}
