import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../../../services/api.service";

@Component({
  selector: "app-user-form",
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.css"],
})
export class UserFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.minLength(6)],
      role: ["CASHIER", Validators.required],
      isActive: [true],
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.params["id"];
    if (id) {
      this.isEdit = true;
      this.apiService.getUser(+id).subscribe({
        next: (data: any) => {
          this.form.patchValue(data);
          this.form.get("password")?.clearValidators();
        },
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const id = this.route.snapshot.params["id"];
      const data = { ...this.form.value };
      if (this.isEdit && !data.password) {
        delete data.password;
      }
      const obs = id
        ? this.apiService.updateUser(+id, data)
        : this.apiService.createUser(data);
      obs.subscribe({
        next: () => this.router.navigate(["/users"]),
      });
    }
  }
}
