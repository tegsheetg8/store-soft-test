import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../services/api.service";

@Component({
  selector: "app-stock-in-list",
  templateUrl: "./stock-in-list.component.html",
  styleUrls: ["./stock-in-list.component.css"],
})
export class StockInListComponent implements OnInit {
  stockIns: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getStockIns().subscribe({
      next: (data: any) => (this.stockIns = data),
    });
  }

  viewStockIn(id: number) {
    this.apiService.getStockIn(id).subscribe((data: any) => {
      console.log(data);
    });
  }
}
