import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TutorialRoutingModule } from './tutorial-routing.module';
import { TutorialListComponent } from './tutorial-list/tutorial-list.component';
import { CardModule } from 'primeng/card';
import { AuthenticationComponent } from './authentication/authentication.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [TutorialListComponent, AuthenticationComponent, RegisterComponent],
  imports: [CommonModule, TutorialRoutingModule, CardModule],
})
export class TutorialModule {}
