import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminButtonComponent } from './admin-button/admin-button.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [AdminButtonComponent],
  imports: [CommonModule, ButtonModule],
  exports: [AdminButtonComponent],
})
export class AdminModule {}
