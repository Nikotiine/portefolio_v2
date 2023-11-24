import { Component } from '@angular/core';
import { AdminService } from '../../../core/api/services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(private readonly adminService: AdminService) {}

  public clearDatabase(): void {
    this.adminService.adminControllerClearDatabase().subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
