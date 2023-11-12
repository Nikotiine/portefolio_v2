/* tslint:disable */
/* eslint-disable */
export interface UserProfileDto {
  id: number;
  isActive: boolean;
  role: 'admin' | 'user';
  username: string;
}
