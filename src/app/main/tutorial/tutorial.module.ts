import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TutorialRoutingModule } from './tutorial-routing.module';
import { TutorialListComponent } from './tutorial-list/tutorial-list.component';
import { CardModule } from 'primeng/card';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SharedModule } from '../../shared/shared.module';
import { TooltipModule } from 'primeng/tooltip';
import { MarkdownModule } from 'ngx-markdown';
import { AccordionModule } from 'primeng/accordion';
import { TranslateModule } from '@ngx-translate/core';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ReactiveFormsModule } from '@angular/forms';
import { CommentListComponent } from './comment-list/comment-list.component';
import { ChipModule } from 'primeng/chip';
import { PaginatorModule } from 'primeng/paginator';
import { AuthModule } from '../auth/auth.module';
import { AdminModule } from '../admin/admin.module';

@NgModule({
  declarations: [
    TutorialListComponent,
    CommentFormComponent,
    CommentListComponent,
  ],
  imports: [
    CommonModule,
    TutorialRoutingModule,
    CardModule,
    ButtonModule,
    DialogModule,
    SharedModule,
    TooltipModule,
    MarkdownModule,
    AccordionModule,
    TranslateModule,
    InputTextareaModule,
    ReactiveFormsModule,
    ChipModule,
    PaginatorModule,
    AuthModule,
    AdminModule,
  ],
})
export class TutorialModule {}
