import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../../../services/api.service";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"],
})
export class ProductFormComponent implements OnInit {
  form: FormGroup;
  categories: any[] = [];
  units: any[] = [];
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ["", Validators.required],
      barcode: [""],
      categoryId: ["", Validators.required],
      unitId: ["", Validators.required],
      purchasePrice: ["", [Validators.required, Validators.min(0)]],
      salePrice: ["", [Validators.required, Validators.min(0)]],
      minStock: [0, Validators.min(0)],
    });
  }

  ngOnInit() {
    this.loadCategories();
    this.loadUnits();
    const id = this.route.snapshot.params["id"];
    if (id) {
      this.isEdit = true;
      this.apiService.getProduct(+id).subscribe({
        next: (product: any) => {
          this.form.patchValue(product);
        },
      });
    }
  }

  loadCategories() {
    this.apiService.getCategories().subscribe({
      next: (data: any) => {
        this.categories = data;
      },
    });
  }

  loadUnits() {
    this.apiService.getUnits().subscribe({
      next: (data: any) => {
        this.units = data;
      },
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const id = this.route.snapshot.params["id"];
      if (id) {
        this.apiService.updateProduct(+id, this.form.value).subscribe({
          next: () => this.router.navigate(["/products"]),
          error: (err) => alert("Error updating product"),
        });
      } else {
        this.apiService.createProduct(this.form.value).subscribe({
          next: () => this.router.navigate(["/products"]),
          error: (err) => alert("Error creating product"),
        });
      }
    }
  }
}
