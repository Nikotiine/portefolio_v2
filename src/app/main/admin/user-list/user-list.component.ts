import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../core/api/services/admin.service';
import { UserProfileDto } from '../../../core/api/models/user-profile-dto';
import { CustomMessageService } from '../../../core/services/custom-message.service';
import { ConfirmationService } from 'primeng/api';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  public users: UserProfileDto[] = [];
  constructor(
    private readonly adminService: AdminService,
    private readonly customMessageService: CustomMessageService,
    private readonly confirmationService: ConfirmationService,
    private readonly languageService: LanguageService
  ) {}

  public ngOnInit(): void {
    this.loadUsers();
  }

  /**
   * Charge les tous les utilisateurs de la bdd
   */
  private loadUsers(): void {
    this.adminService.adminControllerGetAllUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (err) => {
        this.customMessageService.errorMessage('account', err.error.message);
      },
    });
  }

  /**
   * Pop-up de confirmation avant la desactivation du compte utlisateur
   * @param id number : id de l'utilisateur
   */
  public confirm(id: number): void {
    this.confirmationService.confirm({
      message: this.languageService.instantTranslate('admin.deleteUser'),
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteUser(id);
      },
    });
  }

  /**
   * Requete api pour desactivation du compte utilisateur,
   * Message de reussite / echec
   * @param id number : id de l'utilisateur
   */
  private deleteUser(id: number): void {
    this.adminService
      .adminControllerDisableUser({
        id: id,
      })
      .subscribe({
        next: (users) => {
          this.customMessageService.successMessage('account', 'userDisable');
          this.users = users;
        },
        error: (err) => {
          this.customMessageService.errorMessage('account', err.error.message);
        },
      });
  }
}
