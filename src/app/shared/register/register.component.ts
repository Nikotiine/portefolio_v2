import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomMessageService } from '../../core/services/custom-message.service';
import { UserRegisterDto } from '../../core/api/models/user-register-dto';
import { UserService } from '../../core/api/services/user.service';
import { UserProfileDto } from '../../core/api/models/user-profile-dto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  @Output() user: EventEmitter<UserProfileDto> =
    new EventEmitter<UserProfileDto>();
  public form: FormGroup;
  constructor(
    private readonly fb: FormBuilder,
    private readonly customMessageService: CustomMessageService,
    private readonly userService: UserService
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  /**
   * Sousmission du formulaire pour creation d'un nouveau compte
   * Verification des saisie de mot passe
   */
  public submit(): void {
    const password = this.form.controls['password'].value;
    const confirmPassword = this.form.controls['confirmPassword'].value;
    const isMatch = this.checkIfPasswordAreMatching(password, confirmPassword);
    // Si les mots de passe ne correspondent pas, stop la fonction et reset les inpout password et confirmPassword
    if (!isMatch) {
      this.resetForm();
      return;
    }
    const newUser: UserRegisterDto = {
      username: this.form.controls['username'].value,
      password: password,
    };
    this.userService
      .userControllerRegister({
        body: newUser,
      })
      .subscribe({
        next: (res) => {
          this.customMessageService.successMessage('account', 'registered');
          // Retoune le profil creer pour la page de connection
          this.user.emit(res);
        },
        error: (err) => {
          this.customMessageService.errorMessage('account', err.error.message);
        },
      });
  }

  /**
   * Verifie que les mots de passe correpondent
   * @param password premier mot de passe
   * @param confirmPassword second mot de passe
   */
  public checkIfPasswordAreMatching(
    password: string,
    confirmPassword: string
  ): boolean {
    let isMatch = false;
    if (password === confirmPassword) {
      isMatch = true;
    }
    return isMatch;
  }

  /**
   * Remet a 0 les inoout des password en cas de non correspondance
   */
  private resetForm(): void {
    this.form.controls['password'].setValue('');
    this.form.controls['confirmPassword'].setValue('');
    this.customMessageService.errorMessage('account', 'invalidPassword');
  }
}
