import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { NgOtpInputComponent, NgOtpInputConfig } from 'ng-otp-input';
import { FieldErrorMessageComponent } from 'src/app/components/field-error-message/field-error-message.component';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';
import { SharedModule } from 'src/modules/shared.module';

@Component({
  selector: 'app-auth-forgot-password-otp',
  templateUrl: 'auth-forgot-password-otp.page.html',
  styleUrls: ['auth-forgot-password-otp.page.scss'],
  standalone: true,
  imports: [
    IonicSharedModule,
    SharedModule,
    NgOtpInputComponent,
    FieldErrorMessageComponent,
  ],
})
export class AuthForgotPasswordOtpPage {
  constructor(private readonly formBuilder: NonNullableFormBuilder) {}

  otpConfig: NgOtpInputConfig = {
    length: 4,
    inputClass:
      'tw-font-open-sans tw-m-0 tw-size-16 tw-rounded-lg tw-border-app-primary tw-bg-transparent tw-text-4xl tw-font-semibold tw-text-app-primary',
    containerClass: '[&_.n-o-c]:tw-justify-evenly',
  };

  verifyOtpForm = this.formBuilder.group({
    otp: ['', [Validators.required, Validators.minLength(4)]],
  });

  submit() {
    if (this.verifyOtpForm.invalid) {
      this.verifyOtpForm.markAllAsTouched();
      return;
    }
  }
}
