import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { NgOtpInputComponent, NgOtpInputConfig } from 'ng-otp-input';
import { BackHeaderComponent } from 'src/app/components/back-title-header/back-title-header.component';
import { FieldErrorMessageComponent } from 'src/app/components/field-error-message/field-error-message.component';
import { ToastService } from 'src/app/services/toast.service';
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
    CommonModule,
    BackHeaderComponent,
  ],
})
export class AuthForgotPasswordOtpPage implements OnInit {
  constructor(
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly navController: NavController,
    private readonly toastService: ToastService
  ) {}

  OtpData: any;

  otpConfig: NgOtpInputConfig = {
    length: 4,
    inputClass:
      'tw-font-open-sans tw-m-0 tw-size-16 tw-rounded-lg tw-border-app-primary tw-bg-transparent tw-text-4xl tw-font-semibold tw-text-app-primary',
    containerClass: '[&_.n-o-c]:tw-justify-evenly',
  };

  verifyOtpForm = this.formBuilder.group({
    otp: ['', [Validators.required, Validators.minLength(4)]],
  });

  ngOnInit() {
    const navState = history.state;
    console.log('PAPAPA', navState);

    if (navState && navState.otp) {
      this.OtpData = navState.otp;
    }
  }

  submit() {
    if (this.verifyOtpForm.invalid) {
      this.verifyOtpForm.markAllAsTouched();
      return;
    }
    const { otp } = this.verifyOtpForm.getRawValue();
    if (otp === this.OtpData.otp) {
      this.navController.navigateRoot(['/reset-password'], {
        state: { data: { email: this.OtpData.email, otp } },
      });
      return;
    }
    this.toastService.show('Wrong Otp', 2000, 'Error', 'top');
    // await this.loadingService.show();7062

    // this.authService.newPassword({ email,otp }).subscribe({
    //   next: async (response) => {
    //     console.log('res', response.data);
    //     this.navController.navigateRoot(['/forgot-password-otp'], {
    //       state: { otp: response.data },
    //     });
    //     await this.loadingService.hide();
    //   },
    //   error: async (err) => {
    //     await this.loadingService.hide();
    //     await this.toastService.show(err.error.message, 2000, 'Error', 'top');
    //     console.error('Login failed:', err);
    //   },
    // });
  }
}
