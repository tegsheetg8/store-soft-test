import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../services/api.service";

@Component({
  selector: "app-sales-list",
  templateUrl: "./sales-list.component.html",
  styleUrls: ["./sales-list.component.css"],
})
export class SalesListComponent implements OnInit {
  sales: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadSales();
  }

  loadSales() {
    this.apiService.getSales().subscribe({
      next: (data: any) => (this.sales = data),
    });
  }

  printReceipt(id: number) {
    window.open(`http://localhost:3000/sales/${id}/receipt`, "_blank");
  }
}
