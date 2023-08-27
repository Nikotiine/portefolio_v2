/* tslint:disable */
/* eslint-disable */
import { UserProfileDto } from './user-profile-dto';
export interface CommentDto {
  author: UserProfileDto;
  comment: string;
  createdAt: string;
  id: number;
  tutorialId: number;
}
