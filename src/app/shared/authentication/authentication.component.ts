import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomMessageService } from '../../core/services/custom-message.service';
import { UserCredentialsDto } from '../../core/api/models/user-credentials-dto';
import { AuthenticationService } from '../../core/api/services/authentication.service';
import { error } from '@angular/compiler-cli/src/transformers/util';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent {
  public form: FormGroup;
  constructor(
    private readonly fb: FormBuilder,
    private readonly customMessageService: CustomMessageService,
    private readonly authenticationService: AuthenticationService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  public submit(): void {
    const credentials: UserCredentialsDto = {
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value,
    };
    this.authenticationService
      .authenticationControllerLogin({
        body: credentials,
      })
      .subscribe({
        next: (res) => {
          console.log(res);
          this.customMessageService.successMessage('account', 'authenticate');
        },
        error: (err) => {
          console.log(err);
          this.customMessageService.errorMessage('account', err.error.message);
        },
      });
  }
}
