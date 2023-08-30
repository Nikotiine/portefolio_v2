import { CommentViewModel } from './CommentViewModel.model';

export class TutorialAccordion {
  id: number;
  title: string;
  src: string;
  totalComments: number;
  likes: number;
  likedByMe: boolean;
  comments: CommentViewModel[];
}
