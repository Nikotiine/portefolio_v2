import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../core/api/services/admin.service';
import { CommentDto } from '../../../core/api/models/comment-dto';
import { HttpClient } from '@angular/common/http';
import { TutorialAccordion } from '../../../core/models/TutorialAccordion.model';
import { forkJoin } from 'rxjs';
import { AdminCommentViewModel } from '../../../core/models/AdminCommentViewModel';
import { CustomMessageService } from '../../../core/services/custom-message.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent implements OnInit {
  public comments: AdminCommentViewModel[] = [];
  constructor(
    private readonly adminService: AdminService,
    private readonly http: HttpClient,
    private readonly customMessageService: CustomMessageService
  ) {}
  public ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    forkJoin([
      this.adminService.adminControllerFindAllComments(),
      this.http.get('assets/data/tutorial.json'),
    ]).subscribe({
      next: (data) => {
        this.createAdminViewModel(data[0], data[1] as TutorialAccordion[]);
      },
      error: (err) => {
        this.customMessageService.errorMessage('comment', err.error.message);
      },
    });
  }

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
    this.comments = commentsViewModel;
  }

  switch(commentId: number): void {
    console.log(commentId);
  }
}
