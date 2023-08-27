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

@Component({
  selector: 'app-tutorial-list',
  templateUrl: './tutorial-list.component.html',
  styleUrls: ['./tutorial-list.component.scss'],
})
export class TutorialListComponent implements OnInit {
  public isLogged: boolean;
  public likes: LikeDto[];
  public loading: boolean;
  public tutorials: TutorialAccordion[] = [
    {
      id: 1,
      title: 'PL-Sql Server',
      src: 'plsql-server.md',
      totalComments: 0,
      likes: 0,
      likedByMe: false,
      comments: [],
    },
    {
      id: 2,
      title: 'MS-Sql Server',
      src: 'mssql-server.md',
      totalComments: 0,
      likes: 0,
      likedByMe: false,
      comments: [],
    },
    {
      id: 3,
      title: 'Git-Lab CE',
      src: 'gitlab.md',
      totalComments: 0,
      likes: 0,
      likedByMe: false,
      comments: [],
    },
    {
      id: 4,
      title: 'Api Nodejs sous Apache',
      src: 'server-debian.md',
      totalComments: 0,
      likes: 0,
      likedByMe: false,
      comments: [],
    },
  ];
  public comments: CommentDto[];

  private readonly summaryCustomMessage: string = 'tutorial';

  constructor(
    private readonly downloadService: DownloadService,
    private readonly securityService: SecurityService,
    private readonly likeService: LikeService,
    private readonly profileService: ProfileService,
    private readonly customMessageService: CustomMessageService,
    private readonly commentService: CommentService
  ) {
    this.isLogged = this.securityService.isLogged();
    this.loading = true;
  }
  ngOnInit(): void {
    //Surveille si l'utilisateur se connecte ou se deconnecte
    this.securityService.authenticated$.subscribe({
      next: (isLogged) => {
        this.isLogged = isLogged;
      },
    });
    this.loadData();
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
   * @param tutorialId l'id du tutoriel ciblé
   */
  public like(tutorialId: number): void {
    const tutorial: TutorialAccordion = this.tutorials.find(
      (tutorial: TutorialAccordion) => tutorial.id === tutorialId
    );
    const message: string = tutorial.likedByMe ? 'unlike' : 'like';
    const like: LikeCreateDto = {
      tutorialId: tutorialId,
      user: this.profileService.getUserProfile(),
    };
    this.likeService
      .likeControllerLikeTutorial({
        body: like,
      })
      .subscribe({
        next: (res) => {
          this.customMessageService.infoMessage(
            this.summaryCustomMessage,
            message
          );
          this.loadData();
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
      this.commentService.commentControllerFindCommentForTutorial(),
    ]).subscribe({
      next: (data) => {
        this.likes = data[0];
        for (const tutorial of this.tutorials) {
          const likes: LikeDto[] = data[0].filter(
            (like) => like.tutorialId === tutorial.id
          );
          const comments: CommentDto[] = data[1].filter(
            (comment) => comment.tutorialId === tutorial.id
          );
          tutorial.totalComments = comments.length;
          tutorial.comments = comments;
          tutorial.likes = likes.length;
        }
        // Si l'utilisateur est connecté
        if (this.isLogged) {
          this.showMyLikes(data[0]);
        }
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
  private showMyLikes(likes: LikeDto[]) {
    const userProfile: UserProfileDto = this.profileService.getUserProfile();
    const myLikes: LikeDto[] = likes.filter(
      (like) => like.user.id === userProfile.id
    );
    for (const tutorial of this.tutorials) {
      tutorial.likedByMe = !!myLikes.find(
        (like) => like.tutorialId === tutorial.id
      );
    }
  }

  public newData(): void {
    this.loadData();
  }
}
