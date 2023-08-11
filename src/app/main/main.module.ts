import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';

import { MenubarModule } from 'primeng/menubar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule } from '@angular/forms';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { LegalNoticesComponent } from './legal-notices/legal-notices.component';
import { CardModule } from 'primeng/card';
import { SidebarModule } from 'primeng/sidebar';
import { ApplicationsComponent } from './applications/applications.component';
import { SettingComponent } from './setting/setting.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SelectButtonModule } from 'primeng/selectbutton';
import { KnowledgeComponent } from './knowledge/knowledge.component';
import { DataViewModule } from 'primeng/dataview';
import { RatingModule } from 'primeng/rating';
import { ProgressBarModule } from 'primeng/progressbar';
import { ChipModule } from 'primeng/chip';
import { CurriculumComponent } from './curriculum/curriculum.component';
import { ProjectsComponent } from './projects/projects.component';
import { SocialNetworkComponent } from './social-network/social-network.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    LegalNoticesComponent,
    ApplicationsComponent,
    SettingComponent,
    KnowledgeComponent,
    CurriculumComponent,
    ProjectsComponent,
    SocialNetworkComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MenubarModule,
    ToggleButtonModule,
    FormsModule,
    SplitButtonModule,
    TranslateModule,
    SharedModule,
    CardModule,
    SidebarModule,
    InputSwitchModule,
    SelectButtonModule,
    DataViewModule,
    RatingModule,
    NgOptimizedImage,
    ProgressBarModule,
    ChipModule,
  ],
})
export class MainModule {}
