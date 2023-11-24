import { Component } from '@angular/core';
import { AdminService } from '../../../core/api/services/admin.service';
import { ConfirmationService } from 'primeng/api';
import { LanguageService } from '../../../core/services/language.service';
import { CustomMessageService } from '../../../core/services/custom-message.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(
    private readonly adminService: AdminService,
    private readonly confirmationService: ConfirmationService,
    private readonly languageService: LanguageService,
    private readonly customMessageService: CustomMessageService
  ) {}

  /**
   * Pop-up de confirmation avant le nettoyage de la bdd
   */
  public confirm(): void {
    this.confirmationService.confirm({
      message: this.languageService.instantTranslate('admin.clearDatabase'),
      header: this.languageService.instantTranslate('admin.warning'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.clearDatabase();
      },
    });
  }

  /**
   * Purge la bdd
   * @private
   */
  private clearDatabase(): void {
    this.adminService.adminControllerClearDatabase().subscribe({
      next: () => {
        this.customMessageService.errorMessage('database', 'databaseErased');
      },
      error: (err) => {
        this.customMessageService.errorMessage('database', err.error.message);
      },
    });
  }
}
