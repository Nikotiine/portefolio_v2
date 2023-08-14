import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TutorialListComponent } from './tutorial-list/tutorial-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: TutorialListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TutorialRoutingModule {}
