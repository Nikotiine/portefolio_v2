import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { LegalNoticesComponent } from './legal-notices/legal-notices.component';

@NgModule({
  declarations: [FooterComponent, LegalNoticesComponent],
  imports: [CommonModule, RouterLink, TranslateModule, CardModule],
  exports: [FooterComponent, LegalNoticesComponent],
})
export class SharedModule {}
