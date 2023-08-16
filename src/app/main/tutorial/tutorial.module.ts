import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TutorialRoutingModule } from './tutorial-routing.module';
import { TutorialListComponent } from './tutorial-list/tutorial-list.component';
import { CardModule } from 'primeng/card';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [TutorialListComponent],
  imports: [
    CommonModule,
    TutorialRoutingModule,
    CardModule,
    ButtonModule,
    DialogModule,
    SharedModule,
  ],
})
export class TutorialModule {}
