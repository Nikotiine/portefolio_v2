import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [FooterComponent],
  imports: [CommonModule, RouterLink, TranslateModule],
  exports: [FooterComponent],
})
export class SharedModule {}
