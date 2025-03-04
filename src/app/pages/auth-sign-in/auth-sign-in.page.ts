import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { FieldErrorMessageComponent } from 'src/app/components/field-error-message/field-error-message.component';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';
import { SharedModule } from 'src/modules/shared.module';

@Component({
  selector: 'app-auth-sign-in',
  templateUrl: 'auth-sign-in.page.html',
  styleUrls: ['auth-sign-in.page.scss'],
  standalone: true,
  imports: [IonicSharedModule, SharedModule, FieldErrorMessageComponent],
})
export class AuthSignInPage {
  constructor(private readonly formBuilder: NonNullableFormBuilder) {}

  passwordVisible = false;

  signInForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  submit() {
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }
  }
}
