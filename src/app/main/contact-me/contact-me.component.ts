import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MailDto } from '../../core/api/models/mail-dto';
import { MailingService } from '../../core/api/services/mailing.service';
import { CustomMessageService } from '../../core/services/custom-message.service';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { catchError, of, switchMap, throwError } from 'rxjs';

@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss'],
})
export class ContactMeComponent {
  public form: FormGroup;
  constructor(
    private readonly fb: FormBuilder,
    private readonly mailingService: MailingService,
    private readonly customMessageService: CustomMessageService,
    private readonly router: Router,
    private readonly recaptchaV3Service: ReCaptchaV3Service
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      object: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  /**
   * Envoie du mail de contact
   * Affiche un message de succes en cas de mail correctement envoye
   * Affiche un message d'erreur en cas d'echec
   */
  public submit(): void {
    const mail: MailDto = {
      email: this.form.controls['email'].value,
      firstName: this.form.controls['firstName'].value,
      lastName: this.form.controls['lastName'].value,
      object: this.form.controls['object'].value,
      message: this.form.controls['message'].value,
    };
    this.recaptchaV3Service
      .execute('importantAction')
      .pipe(
        catchError(() => {
          // Envoye un message d'erreur spécifique
          this.customMessageService.errorMessage('contact', 'invalidToken');
          return throwError(() => 'invalidToken');
        }),
        switchMap(() => {
          // Envoi du mail ici
          return this.mailingService.mailingControllerContact({ body: mail });
        })
      )
      .subscribe({
        next: (res) => {
          res
            ? this.customMessageService.successMessage('contact', 'successMail')
            : this.customMessageService.errorMessage('contact', 'errorMail');
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.customMessageService.errorMessage('contact', err.error.message);
        },
      });
  }
}
