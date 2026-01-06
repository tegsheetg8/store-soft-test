import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../services/api.service";

@Component({
  selector: "app-unit-list",
  templateUrl: "./unit-list.component.html",
  styleUrls: ["./unit-list.component.css"],
})
export class UnitListComponent implements OnInit {
  units: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getUnits().subscribe({
      next: (data: any) => (this.units = data),
    });
  }

  deleteUnit(id: number) {
    this.apiService.deleteUnit(id).subscribe(() => {
      this.ngOnInit();
    });
  }
}
