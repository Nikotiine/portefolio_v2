/* tslint:disable */
/* eslint-disable */
import { UserProfileDto } from './user-profile-dto';
export interface CommentCreateDto {
  author: UserProfileDto;
  comment: string;
  tutorialId: number;
}
