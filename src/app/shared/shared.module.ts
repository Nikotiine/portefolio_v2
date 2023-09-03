import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [FooterComponent],
  imports: [CommonModule, RouterLink, TranslateModule, CardModule],
  exports: [FooterComponent],
})
export class SharedModule {}
