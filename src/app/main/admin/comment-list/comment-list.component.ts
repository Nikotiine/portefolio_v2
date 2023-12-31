import { Component, Input, OnInit } from '@angular/core';
import { AdminService } from '../../../core/api/services/admin.service';
import { CommentDto } from '../../../core/api/models/comment-dto';
import { HttpClient } from '@angular/common/http';
import { TutorialAccordion } from '../../../core/models/TutorialAccordion.model';
import { AdminCommentViewModel } from '../../../core/models/AdminCommentViewModel';
import { CustomMessageService } from '../../../core/services/custom-message.service';
import { ConfirmationService } from 'primeng/api';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent implements OnInit {
  @Input() set allComments(comments: CommentDto[]) {
    this._comments = comments;
    if (this.tutorials.length > 0) {
      this.createAdminViewModel(comments, this.tutorials);
    }
  }
  get comments(): CommentDto[] {
    return this._comments;
  }
  private _comments: CommentDto[] = [];
  public commentsVM: AdminCommentViewModel[] = [];
  private tutorials: TutorialAccordion[] = [];
  constructor(
    private readonly adminService: AdminService,
    private readonly http: HttpClient,
    private readonly customMessageService: CustomMessageService,
    private readonly confirmationService: ConfirmationService,
    private readonly languageService: LanguageService
  ) {}
  public ngOnInit(): void {
    this.loadData();
  }

  /**
   * Charge la liste des tutoriels
   */
  private loadData(): void {
    this.http.get('assets/data/tutorial.json').subscribe({
      next: (data) => {
        this.tutorials = data as TutorialAccordion[];
        this.createAdminViewModel(this.comments, data as TutorialAccordion[]);
      },
      error: (err) => {
        this.customMessageService.errorMessage('comment', err.error.message);
      },
    });
  }

  /**
   * Creer le view model pour les commentaires . Compare les id des tutoriels des commentaire avec la liste des
   * tuti pour inserer le titre dans le AdminCommentViewModel
   * @param comments Les Commentaire de la bdd
   * @param tutorials Les tuto enregistrés dans le Json
   */
  private createAdminViewModel(
    comments: CommentDto[],
    tutorials: TutorialAccordion[]
  ): void {
    const commentsViewModel: AdminCommentViewModel[] = [];
    for (const comment of comments) {
      const tutorial = tutorials.find(
        (tutorial) => tutorial.id === comment.tutorialId
      );
      const commentViewModel: AdminCommentViewModel = {
        ...comment,
        tutorialName: tutorial.title,
      };
      commentsViewModel.push(commentViewModel);
    }
    this.commentsVM = commentsViewModel;
  }

  /**
   * Pop-up de confirmation avant la desactivation du commentaire
   * @param id number : id du commentaire
   */
  public confirm(id: number): void {
    this.confirmationService.confirm({
      message: this.languageService.instantTranslate('admin.deleteComment'),
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteComment(id);
      },
    });
  }

  /**
   * Requete api pour desactivation du commentaire
   * Met a jour le tableau des commentaires
   * Message de reussite / echec
   * @param id number : id du commentaire
   */
  private deleteComment(id: number): void {
    this.adminService
      .adminControllerDisableComment({
        id: id,
      })
      .subscribe({
        next: (comments) => {
          this.customMessageService.successMessage('comment', 'commentDeleted');
          this.createAdminViewModel(comments, this.tutorials);
        },
        error: (err) => {
          this.customMessageService.errorMessage('comment', err.error.message);
        },
      });
  }
}
