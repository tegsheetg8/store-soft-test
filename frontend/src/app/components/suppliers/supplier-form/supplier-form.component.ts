import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../../../services/api.service";

@Component({
  selector: "app-supplier-form",
  templateUrl: "./supplier-form.component.html",
  styleUrls: ["./supplier-form.component.css"],
})
export class SupplierFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: [""],
      phone: [""],
      email: [""],
      address: [""],
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.params["id"];
    if (id) {
      this.isEdit = true;
      this.apiService.getSupplier(+id).subscribe({
        next: (data: any) => this.form.patchValue(data),
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const id = this.route.snapshot.params["id"];
      const obs = id
        ? this.apiService.updateSupplier(+id, this.form.value)
        : this.apiService.createSupplier(this.form.value);
      obs.subscribe({
        next: () => this.router.navigate(["/suppliers"]),
      });
    }
  }
}
