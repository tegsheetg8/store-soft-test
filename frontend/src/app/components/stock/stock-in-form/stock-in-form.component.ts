import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormArray, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from "../../../services/api.service";

@Component({
  selector: "app-stock-in-form",
  templateUrl: "./stock-in-form.component.html",
  styleUrls: ["./stock-in-form.component.css"],
})
export class StockInFormComponent implements OnInit {
  form: FormGroup;
  suppliers: any[] = [];
  products: any[] = [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.form = this.fb.group({
      supplierId: [""],
      items: this.fb.array([]),
    });
  }

  ngOnInit() {
    this.apiService.getSuppliers().subscribe({
      next: (data: any) => (this.suppliers = data),
    });
    this.apiService.getProducts().subscribe({
      next: (data: any) => (this.products = data),
    });
    this.addItem();
  }

  get items() {
    return this.form.get("items") as FormArray;
  }

  addItem() {
    this.items.push(
      this.fb.group({
        productId: [""],
        quantity: [0],
        price: [0],
      })
    );
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  onSubmit() {
    if (this.form.valid) {
      this.apiService.createStockIn(this.form.value).subscribe({
        next: () => this.router.navigate(["/stock-in"]),
      });
    }
  }
}
