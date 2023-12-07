import { CommentDto } from '../api/models/comment-dto';

// La version admin d'une vue commentaire / ajoute le titre du tuto
export interface AdminCommentViewModel extends CommentDto {
  tutorialName: string;
}
