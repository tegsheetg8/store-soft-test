import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../services/api.service";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"],
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.apiService.getUsers().subscribe({
      next: (data: any) => (this.users = data),
    });
  }

  delete(id: number) {
    if (confirm("Are you sure?")) {
      this.apiService.deleteUser(id).subscribe({
        next: () => this.loadUsers(),
      });
    }
  }
}
