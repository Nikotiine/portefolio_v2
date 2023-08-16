import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { AuthenticationComponent } from './authentication/authentication.component';
import { RegisterComponent } from './register/register.component';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [FooterComponent, AuthenticationComponent, RegisterComponent],
  imports: [
    CommonModule,
    RouterLink,
    TranslateModule,
    CardModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
  ],
  exports: [FooterComponent, AuthenticationComponent, RegisterComponent],
})
export class SharedModule {}
