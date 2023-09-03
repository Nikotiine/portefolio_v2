import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LoginButtonComponent } from './login-button/login-button.component';
import { RegisterComponent } from './register/register.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    AuthenticationComponent,
    LoginButtonComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    TooltipModule,
  ],
  exports: [AuthenticationComponent, LoginButtonComponent, RegisterComponent],
})
export class AuthModule {}
