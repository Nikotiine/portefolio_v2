import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProfileService } from '../../../core/services/profile.service';
import { UserProfileDto } from '../../../core/api/models/user-profile-dto';
import { CommentService } from '../../../core/api/services/comment.service';
import { SecurityService } from '../../../core/services/security.service';
import { CustomMessageService } from '../../../core/services/custom-message.service';
import { CommentViewModel } from '../../../core/models/CommentViewModel.model';
import { ConfirmationService } from 'primeng/api';
import { LanguageService } from '../../../core/services/language.service';
import { CommentDto } from '../../../core/api/models/comment-dto';
interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent {
  @Input()
  set comments(comments: CommentViewModel[]) {
    this._comments = comments;
    this.filteredComment = this.getCurrentPageComments(this.startIndex);
  }
  get comments() {
    return this._comments;
  }

  @Output() deleteConfirmation: EventEmitter<CommentDto[]> = new EventEmitter<
    CommentDto[]
  >();

  private _comments: CommentViewModel[] = [];
  public filteredComment: CommentViewModel[] = [];
  public startIndex = 0;
  public itemPerPage = 5;
  public user: UserProfileDto;

  constructor(
    private readonly profileService: ProfileService,
    private readonly commentService: CommentService,
    private readonly securityService: SecurityService,
    private readonly customMessageService: CustomMessageService,
    private readonly confirmationService: ConfirmationService,
    private readonly languageService: LanguageService
  ) {
    this.user = this.profileService.getUserProfile();
  }

  /**
   * Au changement de pagination defini l'index de depart des commentaire a afficher
   * @param event interface PageEvent dans ce ts
   */
  public onPageChange(event: PageEvent): void {
    this.startIndex = event.first;
    this.itemPerPage = event.rows;
    this.filteredComment = this.getCurrentPageComments(this.startIndex);
  }

  /**
   * Retourne le tableau de commentaire a afficher suivant l'index de pagination
   * Ajoute si l'utilisateur courant est l'auteur d'un ou plusieur commentaire
   * @param startIndex l'index au quel doit commence le tableau
   */
  private getCurrentPageComments(startIndex: number): CommentViewModel[] {
    return this._comments.slice(startIndex, startIndex + this.itemPerPage);
  }

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
   * Suppression d'un commentaire par l'utilisateur connecter
   * @param id
   */
  private deleteComment(id: number): void {
    this.commentService
      .commentControllerDeleteComment({
        id: id,
      })
      .subscribe({
        next: (comments) => {
          this.customMessageService.successMessage(
            'tutorial',
            'commentDeleted'
          );
          this.deleteConfirmation.emit(comments);
        },
        error: (err) => {
          this.customMessageService.errorMessage('tutorial', err.error.message);
        },
      });
  }
}
