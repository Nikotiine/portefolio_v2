import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../core/api/services/admin.service';
import { CommentDto } from '../../../core/api/models/comment-dto';
import { HttpClient } from '@angular/common/http';
import { TutorialAccordion } from '../../../core/models/TutorialAccordion.model';
import { forkJoin } from 'rxjs';
import { AdminCommentViewModel } from '../../../core/models/AdminCommentViewModel';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent implements OnInit {
  public comments: CommentDto[] = [];
  private tutorials: TutorialAccordion[] = [];
  public commentViewModel: AdminCommentViewModel[] = [];
  constructor(
    private readonly adminService: AdminService,
    private readonly http: HttpClient
  ) {}
  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    forkJoin([
      this.adminService.adminControllerFindAllComments(),
      this.http.get('assets/data/tutorials.json'),
    ]).subscribe({
      next: (data) => {
        this.comments = data[0];
        this.tutorials = data[1] as TutorialAccordion[];
        this.createAdminViewModel(data[0], data[1] as TutorialAccordion[]);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private createAdminViewModel(
    comment: CommentDto[],
    tutorials: TutorialAccordion[]
  ) {
    console.log(comment);
    console.log(tutorials);
  }
}
