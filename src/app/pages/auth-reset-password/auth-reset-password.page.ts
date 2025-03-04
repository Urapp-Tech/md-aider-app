import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { FieldErrorMessageComponent } from 'src/app/components/field-error-message/field-error-message.component';
import { passwordMismatchValidation } from 'src/app/utilities/password-mismatch-validation';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';
import { SharedModule } from 'src/modules/shared.module';

@Component({
  selector: 'app-auth-reset-password',
  templateUrl: 'auth-reset-password.page.html',
  styleUrls: ['auth-reset-password.page.scss'],
  standalone: true,
  imports: [IonicSharedModule, SharedModule, FieldErrorMessageComponent],
})
export class AuthResetPasswordPage {
  constructor(private readonly formBuilder: NonNullableFormBuilder) {}

  newPasswordVisible = false;
  confirmPasswordVisible = false;

  resetForm = this.formBuilder.group(
    {
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    },
    {
      validators: passwordMismatchValidation('newPassword', 'confirmPassword'),
    }
  );

  submit() {
    if (this.resetForm.invalid) {
      this.resetForm.markAllAsTouched();
      return;
    }
  }
}
