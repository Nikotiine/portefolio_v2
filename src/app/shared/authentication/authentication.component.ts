import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomMessageService } from '../../core/services/custom-message.service';
import { UserCredentialsDto } from '../../core/api/models/user-credentials-dto';
import { AuthenticationService } from '../../core/api/services/authentication.service';
import { SecurityService } from '../../core/services/security.service';
import { UserProfileDto } from '../../core/api/models/user-profile-dto';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent {
  @Output() authenticate: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input()
  set user(user: UserProfileDto) {
    this.form.controls['username'].setValue(user.username);
  }

  public form: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly customMessageService: CustomMessageService,
    private readonly authenticationService: AuthenticationService,
    private readonly securityService: SecurityService
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  public submit(): void {
    const credentials: UserCredentialsDto = {
      username: this.form.controls['username'].value,
      password: this.form.controls['password'].value,
    };
    this.authenticationService
      .authenticationControllerLogin({
        body: credentials,
      })
      .subscribe({
        next: (res) => {
          this.securityService.saveToken(res);
          this.customMessageService.successMessage('account', 'authenticate');
          this.authenticate.emit(true);
        },
        error: (err) => {
          console.log(err);
          this.customMessageService.errorMessage('account', err.error.message);
        },
      });
  }
}
