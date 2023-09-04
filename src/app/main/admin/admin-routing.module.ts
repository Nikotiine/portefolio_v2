import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routing } from '../../core/enum/Routing.enum';

const routes: Routes = [
  {
    path: '',
    redirectTo: Routing.ADMIN_DASHBOARD,
    pathMatch: 'full',
  },
  {
    path: Routing.ADMIN_DASHBOARD,
    component: DashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
