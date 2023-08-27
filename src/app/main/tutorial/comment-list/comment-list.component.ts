import { Component, Input, OnInit } from '@angular/core';
import { CommentDto } from '../../../core/api/models/comment-dto';
import { ProfileService } from '../../../core/services/profile.service';
import { UserProfileDto } from '../../../core/api/models/user-profile-dto';
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
  @Input() set comments(comments: CommentDto[]) {
    this._comments = comments;
    this.filteredComment = this.getCurrentPageComments(this.startIndex);
  }
  get comments() {
    return this._comments;
  }

  private _comments: CommentDto[] = [];
  public filteredComment: CommentDto[] = [];
  public startIndex = 0;
  public itemPerPage = 5;
  public user: UserProfileDto;

  constructor(private readonly profileService: ProfileService) {
    this.user = this.profileService.getUserProfile();
  }
  public onPageChange(event: PageEvent): void {
    this.startIndex = event.first;
    this.itemPerPage = event.rows;
    this.filteredComment = this.getCurrentPageComments(this.startIndex);
  }
  private getCurrentPageComments(startIndex: number): CommentDto[] {
    return this.comments.slice(startIndex, startIndex + this.itemPerPage);
  }

  public deleteComment(id: number): void {}
}
