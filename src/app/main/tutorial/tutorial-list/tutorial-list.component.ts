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
      comments: 0,
      likes: 0,
      likedByMe: false,
    },
    {
      id: 2,
      title: 'MS-Sql Server',
      src: 'mssql-server.md',
      comments: 10,
      likes: 0,
      likedByMe: false,
    },
    {
      id: 3,
      title: 'Git-Lab CE',
      src: 'gitlab.md',
      comments: 1,
      likes: 0,
      likedByMe: false,
    },
    {
      id: 4,
      title: 'Api Nodejs sous Apache',
      src: 'server-debian.md',
      comments: 1,
      likes: 0,
      likedByMe: false,
    },
  ];
  constructor(
    private readonly downloadService: DownloadService,
    private readonly securityService: SecurityService,
    private readonly likeService: LikeService,
    private readonly profileService: ProfileService,
    private readonly customMessageService: CustomMessageService
  ) {
    this.isLogged = this.securityService.isLogged();
    this.loading = true;
  }
  ngOnInit(): void {
    this.securityService.authenticated$.subscribe({
      next: (isLogged) => {
        this.isLogged = isLogged;
      },
    });
    this.loadLikes();
  }
  onLoad($event: string) {
    console.log($event);
  }

  onError($event: string | Error) {
    console.log($event);
  }

  public downloadMarkdown(source: string): void {
    this.downloadService.download('markdown', 'markdown', source);
  }

  public like(tutorialId: number): void {
    const like: LikeCreateDto = {
      tutorialId: tutorialId,
      user: this.profileService.getUserProfile(),
    };
    this.likeService
      .likeControllerGiveLikeForTutorial({
        body: like,
      })
      .subscribe({
        next: (res) => {
          this.customMessageService.successMessage('tutorial', 'thanks');
          this.loadLikes();
        },
        error: (err) => {
          this.customMessageService.errorMessage('tutorial', err.error.message);
        },
      });
  }

  private loadLikes(): void {
    this.likeService.likeControllerGetAllLikesOfTutorials().subscribe({
      next: (data) => {
        this.likes = data;
        for (const tutorial of this.tutorials) {
          const likes = data.filter((like) => like.tutorialId === tutorial.id);
          tutorial.likes = likes.length;
        }

        if (this.isLogged) {
          this.showMyLikes(data);
        }
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private showMyLikes(likes: LikeDto[]) {
    const userProfile: UserProfileDto = this.profileService.getUserProfile();
    const myLikes: LikeDto[] = likes.filter(
      (like) => like.user.id === userProfile.id
    );
    for (const tutorial of this.tutorials) {
      if (myLikes.find((like) => like.tutorialId === tutorial.id)) {
        tutorial.likedByMe = true;
      }
    }
  }
}
