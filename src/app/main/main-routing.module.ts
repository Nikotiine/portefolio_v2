import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { LegalNoticesComponent } from '../shared/legal-notices/legal-notices.component';
import { SettingComponent } from './setting/setting.component';
import { Routing } from '../core/enum/Routing.enum';
import { KnowledgeComponent } from './knowledge/knowledge.component';
import { CurriculumComponent } from './curriculum/curriculum.component';
import { ProjectsComponent } from './projects/projects.component';
import { SocialNetworkComponent } from './social-network/social-network.component';
import { UserResolver } from '../core/resolvers/user.resolver';
import { AdminGuard } from '../core/admin.guard';
import { NotFoundComponent } from '../shared/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    resolve: {
      user: UserResolver,
    },
    children: [
      {
        path: '',
        redirectTo: Routing.HOME,
        pathMatch: 'full',
      },
      {
        path: Routing.HOME,
        component: HomeComponent,
      },
      {
        path: Routing.KNOWLEDGE,
        component: KnowledgeComponent,
      },
      {
        path: Routing.CURRICULUM,
        component: CurriculumComponent,
      },
      {
        path: Routing.PROJECTS,
        component: ProjectsComponent,
      },
      {
        path: Routing.SOCIAL_NETWORK,
        component: SocialNetworkComponent,
      },
      {
        path: Routing.TUTORIAL,
        loadChildren: () =>
          import('./tutorial/tutorial.module').then((m) => m.TutorialModule),
      },
      {
        path: Routing.ADMIN,
        canActivate: [AdminGuard],
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path: Routing.SETTING,
        component: SettingComponent,
      },
      {
        path: Routing.LEGAL_NOTICE,
        component: LegalNoticesComponent,
      },
      {
        path: Routing.NOT_FOUND,
        component: NotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
