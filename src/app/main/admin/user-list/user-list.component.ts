import { Component, Input } from '@angular/core';
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
export class UserListComponent {
  @Input() set allUsers(users: UserProfileDto[]) {
    this.users = users;
  }

  public users: UserProfileDto[] = [];
  constructor(
    private readonly adminService: AdminService,
    private readonly customMessageService: CustomMessageService,
    private readonly confirmationService: ConfirmationService,
    private readonly languageService: LanguageService
  ) {}

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
