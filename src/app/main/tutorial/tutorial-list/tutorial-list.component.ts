import { Component, OnInit } from '@angular/core';
import { TutorialAccordion } from '../../../core/models/TutorialAccordion.model';
import { DownloadService } from '../../../core/services/download.service';
import { SecurityService } from '../../../core/services/security.service';
import { LikeService } from '../../../core/api/services/like.service';
import { LikeCreateDto } from '../../../core/api/models/like-create-dto';
import { ProfileService } from '../../../core/services/profile.service';
import { CustomMessageService } from '../../../core/services/custom-message.service';
import { LikeDto } from '../../../core/api/models/like-dto';
import { UserProfileDto } from '../../../core/api/models/user-profile-dto';
import { CommentService } from '../../../core/api/services/comment.service';
import { CommentDto } from '../../../core/api/models/comment-dto';
import { forkJoin } from 'rxjs';
import { CommentViewModel } from '../../../core/models/CommentViewModel.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tutorial-list',
  templateUrl: './tutorial-list.component.html',
  styleUrls: ['./tutorial-list.component.scss'],
})
export class TutorialListComponent implements OnInit {
  public isLogged: boolean;
  public likes: LikeDto[];
  public loading: boolean;
  public tutorials: TutorialAccordion[] = [];
  public comments: CommentDto[];
  public isAdmin = false;
  public accordionActiveIndex = -1;
  private readonly summaryCustomMessage: string = 'tutorial';

  constructor(
    private readonly downloadService: DownloadService,
    private readonly securityService: SecurityService,
    private readonly likeService: LikeService,
    private readonly profileService: ProfileService,
    private readonly customMessageService: CustomMessageService,
    private readonly commentService: CommentService,
    private readonly http: HttpClient
  ) {
    this.isLogged = this.securityService.isLogged();
    this.loading = true;
  }
  ngOnInit(): void {
    //Surveille si l'utilisateur se connecte ou se deconnecte
    this.securityService.authenticated$.subscribe({
      next: () => {
        this.isLogged = this.securityService.isLogged();
        this.loadData();
      },
    });
  }

  /**
   * Permet de telecharger le fichier markdown du tutorial.
   * Utlise le downloadService
   * @param source Source du fichier markdown
   */
  public downloadMarkdown(source: string): void {
    this.downloadService.download('markdown', 'markdown', source);
  }

  /**
   * Like ou Unlike du tutoriel
   * Met a jour la liste des like et l'attibut isMyLike a retour de la reponse
   * @param tutorialId l'id du tutoriel ciblé
   */
  public toggleLike(tutorialId: number): void {
    const tutorial: TutorialAccordion = this.tutorials.find(
      (tutorial: TutorialAccordion) => tutorial.id === tutorialId
    );
    const message: string = tutorial.likedByMe ? 'unlike' : 'like';
    const user: UserProfileDto = this.profileService.getUserProfile();
    const like: LikeCreateDto = {
      tutorialId: tutorialId,
      user: user,
      isActive: !tutorial.likedByMe,
    };
    this.likeService
      .likeControllerLikeTutorial({
        body: like,
      })
      .subscribe({
        next: (likes) => {
          this.customMessageService.infoMessage(
            this.summaryCustomMessage,
            message
          );
          tutorial.likes = likes.filter((like) => like.isActive).length;
          tutorial.likedByMe = !tutorial.likedByMe;
        },
        error: (err) => {
          this.customMessageService.errorMessage(
            this.summaryCustomMessage,
            err.error.message
          );
        },
      });
  }

  /**
   * Charge tout les likes des tuto enregistre en bdd
   */
  private loadData(): void {
    forkJoin([
      this.likeService.likeControllerGetAllLikesOfTutorials(),
      this.commentService.commentControllerGetAllCommentsOfTutorial(),
      this.http.get('assets/data/tutorial.json'),
    ]).subscribe({
      next: (data) => {
        this.tutorials = data[2] as TutorialAccordion[];
        this.likes = data[0];
        for (const tutorial of this.tutorials) {
          const likes: LikeDto[] = data[0].filter(
            (like) => like.tutorialId === tutorial.id
          );
          const comments: CommentDto[] = data[1].filter(
            (comment) => comment.tutorialId === tutorial.id
          );
          tutorial.totalComments = comments.length;
          tutorial.comments = this.createCommentViewModel(comments);
          tutorial.likes = likes.length;
        }
        this.showMyLikes(data[0]);
        this.loading = false;
      },
      error: (err) => {
        this.customMessageService.errorMessage(
          this.summaryCustomMessage,
          err.error.message
        );
      },
    });
  }

  /**
   * Modifie l'attribut likeByMe du model TutorialAccordion en fonction des like de l'utilisateur connecté
   * @param likes La liste de tout les like en Bdd
   */
  private showMyLikes(likes: LikeDto[]): void {
    const user: UserProfileDto = this.profileService.getUserProfile();
    if (user) {
      const myLikes: LikeDto[] = likes.filter(
        (like) => like.user.id === user.id
      );
      for (const tutorial of this.tutorials) {
        tutorial.likedByMe = !!myLikes.find(
          (like) => like.tutorialId === tutorial.id
        );
      }
    }
    this.isAdmin = this.profileService.isAdmin();
  }

  /**
   * Creer le comment view model pour comment-list
   * Met a jour l'attribut isMyComment en cas de connection ou deconnexion
   * @param comments la liste des commentaires provenann du trie par tutorial
   */
  private createCommentViewModel(comments: CommentDto[]): CommentViewModel[] {
    const user: UserProfileDto = this.profileService.getUserProfile();
    return comments.map((comment) => ({
      ...comment,
      isMyComment: user && comment.author.id === user.id,
    }));
  }

  /**
   * Rafraichi les commentaires apres l'ajout d'un nouveau ou la suppression
   * @param comments le tableau des commentaires du tutoriel concerne
   * @param tutorialId l'id du tuto
   */
  updateComments(comments: CommentDto[], tutorialId: number) {
    const tutorial = this.tutorials.find((t) => t.id === tutorialId);
    tutorial.comments = this.createCommentViewModel(comments);
  }
}
