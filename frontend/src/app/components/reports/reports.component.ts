import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../services/api.service";

@Component({
  selector: "app-reports",
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.css"],
})
export class ReportsComponent implements OnInit {
  salesReport: any = null;
  stockBalance: any[] = [];
  lowStock: any[] = [];
  startDate: string = "";
  endDate: string = "";

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadStockBalance();
    this.loadLowStock();
  }

  loadSalesReport() {
    if (this.startDate && this.endDate) {
      this.apiService.getSalesReport(this.startDate, this.endDate).subscribe({
        next: (data: any) => (this.salesReport = data),
      });
    }
  }

  loadStockBalance() {
    this.apiService.getStockBalanceReport().subscribe({
      next: (data: any) => (this.stockBalance = data),
    });
  }

  loadLowStock() {
    this.apiService.getLowStockReport().subscribe({
      next: (data: any) => (this.lowStock = data),
    });
  }
}
