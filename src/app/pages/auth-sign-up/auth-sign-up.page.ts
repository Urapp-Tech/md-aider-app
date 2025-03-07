import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { FieldErrorMessageComponent } from 'src/app/components/field-error-message/field-error-message.component';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';
import { SharedModule } from 'src/modules/shared.module';

@Component({
  selector: 'app-auth-sign-up',
  templateUrl: 'auth-sign-up.page.html',
  styleUrls: ['auth-sign-up.page.scss'],
  standalone: true,
  imports: [IonicSharedModule, SharedModule, FieldErrorMessageComponent],
})
export class AuthSignUpPage {
  constructor(private readonly formBuilder: NonNullableFormBuilder) {}

  passwordVisible = false;

  signUpForm = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  submit() {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }
  }
}
