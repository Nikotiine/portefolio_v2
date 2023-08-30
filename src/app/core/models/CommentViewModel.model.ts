import { CommentDto } from '../api/models/comment-dto';

export interface CommentViewModel extends CommentDto {
  isMyComment: boolean;
}
