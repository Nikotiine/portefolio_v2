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
import { LoginButtonComponent } from './login-button/login-button.component';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    FooterComponent,
    AuthenticationComponent,
    RegisterComponent,
    LoginButtonComponent,
  ],
  imports: [
    CommonModule,
    RouterLink,
    TranslateModule,
    CardModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    DialogModule,
    TooltipModule,
  ],
  exports: [
    FooterComponent,
    AuthenticationComponent,
    RegisterComponent,
    LoginButtonComponent,
  ],
})
export class SharedModule {}
