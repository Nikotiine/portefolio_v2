import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { LegalNoticesComponent } from './legal-notices/legal-notices.component';
import { SettingComponent } from './setting/setting.component';
import { Routing } from '../core/enum/Routing.enum';
import { KnowledgeComponent } from './knowledge/knowledge.component';
import { CurriculumComponent } from './curriculum/curriculum.component';
import { ProjectsComponent } from './projects/projects.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
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
        path: Routing.SETTING,
        component: SettingComponent,
      },
      {
        path: Routing.LEGAL_NOTICE,
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
