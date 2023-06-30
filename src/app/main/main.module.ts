import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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

@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    LegalNoticesComponent,
    ApplicationsComponent,
    SettingComponent,
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
  ],
})
export class MainModule {}
