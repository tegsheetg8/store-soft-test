import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../services/api.service";

@Component({
  selector: "app-stock-taking-list",
  templateUrl: "./stock-taking-list.component.html",
  styleUrls: ["./stock-taking-list.component.css"],
})
export class StockTakingListComponent implements OnInit {
  stockTakings: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getStockTakings().subscribe({
      next: (data: any) => (this.stockTakings = data),
    });
  }

  viewStockTaking(id: number) {
    this.apiService.getStockTaking(id).subscribe((data: any) => {
      console.log(data);
    });
  }
}
