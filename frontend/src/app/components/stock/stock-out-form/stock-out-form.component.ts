import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormArray } from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from "../../../services/api.service";

@Component({
  selector: "app-stock-out-form",
  templateUrl: "./stock-out-form.component.html",
  styleUrls: ["./stock-out-form.component.css"],
})
export class StockOutFormComponent implements OnInit {
  form: any;
  products: any[] = [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.form = this.fb.group({
      reason: [""],
      items: this.fb.array([]),
    });
  }

  ngOnInit() {
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
      })
    );
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  onSubmit() {
    if (this.form.valid) {
      this.apiService.createStockOut(this.form.value).subscribe({
        next: () => this.router.navigate(["/stock-out"]),
      });
    }
  }
}
