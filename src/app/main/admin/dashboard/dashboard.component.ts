import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../core/api/services/admin.service';
import { ConfirmationService } from 'primeng/api';
import { LanguageService } from '../../../core/services/language.service';
import { CustomMessageService } from '../../../core/services/custom-message.service';
import { SecurityService } from '../../../core/services/security.service';
import { forkJoin } from 'rxjs';
import { CommentDto } from '../../../core/api/models/comment-dto';
import { UserProfileDto } from '../../../core/api/models/user-profile-dto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public comments: CommentDto[] = [];
  public users: UserProfileDto[] = [];
  constructor(
    private readonly adminService: AdminService,
    private readonly confirmationService: ConfirmationService,
    private readonly languageService: LanguageService,
    private readonly customMessageService: CustomMessageService,
    private readonly securityService: SecurityService
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
   * Purge la bdd et met a jour les tableau utilisateur et commentaire dans les accordion respectifs
   */
  private clearDatabase(): void {
    this.adminService.adminControllerClearDatabase().subscribe({
      next: (res) => {
        this.users = res.users;
        this.comments = res.comments;
        this.customMessageService.successMessage('database', 'databaseErased');
      },
      error: (err) => {
        this.customMessageService.errorMessage('database', err.error.message);
      },
    });
  }

  /**
   * Deconnexion de l'admin
   */
  public logout(): void {
    this.securityService.logout();
  }

  public ngOnInit(): void {
    this.loadData();
  }

  /**
   * Charge les commentaires et les utilisateurs acrtifs ou non
   */
  private loadData(): void {
    forkJoin([
      this.adminService.adminControllerFindAllComments(),
      this.adminService.adminControllerGetAllUsers(),
    ]).subscribe({
      next: (data) => {
        this.comments = data[0];
        this.users = data[1];
      },
      error: (err) => {
        this.customMessageService.errorMessage('database', err.error.message);
      },
    });
  }
}
