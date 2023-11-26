import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommentCreateDto } from '../../../core/api/models/comment-create-dto';
import { CustomMessageService } from '../../../core/services/custom-message.service';
import { ProfileService } from '../../../core/services/profile.service';
import { CommentService } from '../../../core/api/services/comment.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent {
  @Input() set tutorialId(id: number) {
    this.tutorialId$ = id;
  }
  get tutorialId() {
    return this.tutorialId$;
  }

  @Output() newComment: EventEmitter<void> = new EventEmitter<void>();
  public form: FormGroup;
  private tutorialId$: number;

  constructor(
    private readonly fb: FormBuilder,
    private readonly customMessageService: CustomMessageService,
    private readonly profileService: ProfileService,
    private readonly commentService: CommentService
  ) {
    this.form = this.fb.group({
      comment: [''],
    });
  }

  public sendComment(tutorialId: number): void {
    const comment: CommentCreateDto = {
      comment: this.form.controls['comment'].value,
      author: this.profileService.getUserProfile(),
      tutorialId: tutorialId,
    };

    this.commentService
      .commentControllerNewComment({
        body: comment,
      })
      .subscribe({
        next: (res) => {
          this.customMessageService.successMessage('tutorial', 'newComment');
          this.newComment.emit();
          this.form.controls['comment'].setValue('');
        },
        error: (err) => {
          this.customMessageService.errorMessage('tutorial', err.error.message);
        },
      });
  }
}
