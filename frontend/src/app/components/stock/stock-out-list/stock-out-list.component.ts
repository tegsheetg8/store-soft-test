import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../services/api.service";

@Component({
  selector: "app-stock-out-list",
  templateUrl: "./stock-out-list.component.html",
  styleUrls: ["./stock-out-list.component.css"],
})
export class StockOutListComponent implements OnInit {
  stockOuts: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getStockOuts().subscribe({
      next: (data: any) => (this.stockOuts = data),
    });
  }

  viewStockOut(id: number) {
    this.apiService.getStockOut(id).subscribe((data: any) => {
      console.log(data);
    });
  }
}
