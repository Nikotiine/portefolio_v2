import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MenubarModule } from 'primeng/menubar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule } from '@angular/forms';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [LayoutComponent, HomeComponent, NavigationComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    MenubarModule,
    ToggleButtonModule,
    FormsModule,
    SplitButtonModule,
    TranslateModule,
  ],
})
export class MainModule {}
