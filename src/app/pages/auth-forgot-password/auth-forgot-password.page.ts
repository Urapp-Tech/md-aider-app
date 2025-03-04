import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { FieldErrorMessageComponent } from 'src/app/components/field-error-message/field-error-message.component';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';
import { SharedModule } from 'src/modules/shared.module';

@Component({
  selector: 'app-auth-forgot-password',
  templateUrl: 'auth-forgot-password.page.html',
  styleUrls: ['auth-forgot-password.page.scss'],
  standalone: true,
  imports: [IonicSharedModule, SharedModule, FieldErrorMessageComponent],
})
export class AuthForgotPasswordPage {
  constructor(private readonly formBuilder: NonNullableFormBuilder) {}

  forgotPasswordForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });

  submit() {
    if (this.forgotPasswordForm.invalid) {
      this.forgotPasswordForm.markAllAsTouched();
      return;
    }
  }
}
