import { CommentDto } from '../api/models/comment-dto';

export class TutorialAccordion {
  id: number;
  title: string;
  src: string;
  totalComments: number;
  likes: number;
  likedByMe: boolean;
  comments: CommentDto[];
}
