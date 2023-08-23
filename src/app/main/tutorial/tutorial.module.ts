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

@NgModule({
  declarations: [TutorialListComponent],
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
  ],
})
export class TutorialModule {}
