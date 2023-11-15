import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomMessageService } from '../../../core/services/custom-message.service';
import { UserCredentialsDto } from '../../../core/api/models/user-credentials-dto';
import { AuthenticationService } from '../../../core/api/services/authentication.service';
import { SecurityService } from '../../../core/services/security.service';
import { UserProfileDto } from '../../../core/api/models/user-profile-dto';
import { mergeMap } from 'rxjs';
import { ProfileService } from '../../../core/services/profile.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent {
  @Output() authenticate: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input()
  set user(user: UserProfileDto) {
    if (user) {
      this.form.controls['username'].setValue(user.username);
    }
  }

  public form: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly customMessageService: CustomMessageService,
    private readonly authenticationService: AuthenticationService,
    private readonly securityService: SecurityService,
    private readonly profileService: ProfileService
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  /**
   * Soumission du formulaire de login. Token attendu en reponse.
   * Test du token des la reponse recu pour valider l'access a l'api.
   * Le token est sauvegarde dans un cookie
   */
  public submit(): void {
    const credentials: UserCredentialsDto = {
      username: this.form.controls['username'].value,
      password: this.form.controls['password'].value,
    };
    this.authenticationService
      .authenticationControllerLogin({
        body: credentials,
      })
      .pipe(
        mergeMap((token) => {
          this.securityService.saveToken(token);
          return this.authenticationService.authenticationControllerMe();
        })
      )
      .subscribe({
        next: (user) => {
          this.securityService.login(user);
          this.customMessageService.successMessage('account', 'authenticate');
          this.authenticate.emit(true);
        },
        error: (err) => {
          this.customMessageService.errorMessage('account', err.error.message);
        },
      });
  }
}
