import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminButtonComponent } from './admin-button/admin-button.component';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';
import { UserListComponent } from './user-list/user-list.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { TableModule } from 'primeng/table';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    AdminButtonComponent,
    DashboardComponent,
    UserListComponent,
    CommentListComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    RouterLink,
    AdminRoutingModule,
    CardModule,
    AccordionModule,
    TableModule,
    TranslateModule,
    TooltipModule,
  ],
  exports: [AdminButtonComponent],
})
export class AdminModule {}
