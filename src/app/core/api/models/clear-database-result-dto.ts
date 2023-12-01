/* tslint:disable */
/* eslint-disable */
import { CommentDto } from './comment-dto';
import { UserProfileDto } from './user-profile-dto';
export interface ClearDatabaseResultDto {
  comments: Array<CommentDto>;
  users: Array<UserProfileDto>;
}
