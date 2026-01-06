import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../services/api.service";

@Component({
  selector: "app-category-list",
  templateUrl: "./category-list.component.html",
  styleUrls: ["./category-list.component.css"],
})
export class CategoryListComponent implements OnInit {
  categories: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.apiService.getCategories().subscribe({
      next: (data: any) => (this.categories = data),
    });
  }

  deleteCategory(id: number) {
    this.apiService.deleteCategory(id).subscribe(() => {
      this.ngOnInit();
    });
  }
}
