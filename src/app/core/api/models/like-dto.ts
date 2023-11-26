/* tslint:disable */
/* eslint-disable */
import { UserProfileDto } from './user-profile-dto';
export interface LikeDto {
  id: number;
  isActive: boolean;
  tutorialId: number;
  user: UserProfileDto;
}
