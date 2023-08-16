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

  public submit(): void {
    const password = this.form.controls['password'].value;
    const confirmPassword = this.form.controls['confirmPassword'].value;
    const isMatch = this.checkIfPasswordAreMatching(password, confirmPassword);
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
          this.user.emit(res);
        },
        error: (err) => {
          this.customMessageService.errorMessage('account', err.error.message);
        },
      });
  }

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

  private resetForm(): void {
    this.form.controls['password'].setValue('');
    this.form.controls['confirmPassword'].setValue('');
    this.customMessageService.errorMessage('account', 'invalidPassword');
  }
}
