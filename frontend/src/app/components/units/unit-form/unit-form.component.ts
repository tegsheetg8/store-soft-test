import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../../../services/api.service";

@Component({
  selector: "app-unit-form",
  templateUrl: "./unit-form.component.html",
  styleUrls: ["./unit-form.component.css"],
})
export class UnitFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ["", Validators.required],
      shortName: ["", Validators.required],
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.params["id"];
    if (id) {
      this.isEdit = true;
      this.apiService.getUnit(+id).subscribe({
        next: (data: any) => this.form.patchValue(data),
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const id = this.route.snapshot.params["id"];
      const obs = id
        ? this.apiService.updateUnit(+id, this.form.value)
        : this.apiService.createUnit(this.form.value);
      obs.subscribe({
        next: () => this.router.navigate(["/units"]),
      });
    }
  }
}
