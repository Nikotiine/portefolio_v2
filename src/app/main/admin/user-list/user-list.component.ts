import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../core/api/services/admin.service';
import { UserProfileDto } from '../../../core/api/models/user-profile-dto';
import { CustomMessageService } from '../../../core/services/custom-message.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  public users: UserProfileDto[] = [];
  constructor(
    private readonly adminService: AdminService,
    private readonly customMessageService: CustomMessageService
  ) {}

  public ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.adminService.adminControllerGetAllUsers().subscribe({
      next: (users) => {
        console.log(users);
        this.users = users;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteUser(id: number): void {
    console.log(id);
    this.adminService
      .adminControllerDisableUser({
        id: id,
      })
      .subscribe({
        next: (data) => {
          console.log(data);
          this.customMessageService.successMessage('account', 'userDisable');
          this.loadUsers();
        },
        error: (err) => {
          this.customMessageService.errorMessage('', err.error.message);
        },
      });
  }
}
