import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../services/api.service";

@Component({
  selector: "app-supplier-list",
  templateUrl: "./supplier-list.component.html",
  styleUrls: ["./supplier-list.component.css"],
})
export class SupplierListComponent implements OnInit {
  suppliers: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getSuppliers().subscribe({
      next: (data: any) => (this.suppliers = data),
    });
  }

  deleteSupplier(id: number) {
    this.apiService.deleteSupplier(id).subscribe(() => {
      this.ngOnInit();
    });
  }
}
