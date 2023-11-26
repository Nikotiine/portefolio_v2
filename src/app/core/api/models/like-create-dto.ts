/* tslint:disable */
/* eslint-disable */
import { UserProfileDto } from './user-profile-dto';
export interface LikeCreateDto {
  isActive: boolean;
  tutorialId: number;
  user: UserProfileDto;
}
