import { CommentDto } from '../api/models/comment-dto';

export interface AdminCommentViewModel extends CommentDto {
  tutorialName: string;
}
