import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { LegalNoticesComponent } from './legal-notices/legal-notices.component';
import { SettingComponent } from './setting/setting.component';
import { Routing } from '../core/enum/Routing.enum';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: Routing.SETTING,
        component: SettingComponent,
      },
      {
        path: 'legal-notice',
        component: LegalNoticesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
