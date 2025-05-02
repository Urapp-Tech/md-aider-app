import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { BackHeaderComponent } from 'src/app/components/back-title-header/back-title-header.component';
import { FieldErrorMessageComponent } from 'src/app/components/field-error-message/field-error-message.component';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';
import { SharedModule } from 'src/modules/shared.module';

@Component({
  selector: 'app-auth-forgot-password',
  templateUrl: 'auth-forgot-password.page.html',
  styleUrls: ['auth-forgot-password.page.scss'],
  standalone: true,
  imports: [
    IonicSharedModule,
    SharedModule,
    FieldErrorMessageComponent,
    BackHeaderComponent,
  ],
})
export class AuthForgotPasswordPage {
  constructor(
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly loadingService: LoadingService,
    private readonly toastService: ToastService,
    private authService: AuthService,
    private readonly navController: NavController
  ) {}

  forgotPasswordForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });

  async submit() {
    if (this.forgotPasswordForm.invalid) {
      this.forgotPasswordForm.markAllAsTouched();
      return;
    }
    const { email } = this.forgotPasswordForm.getRawValue();

    await this.loadingService.show();

    this.authService.getOtp({ email }).subscribe({
      next: async (response) => {
        console.log('res', response.data);
        this.navController.navigateRoot(['/forgot-password-otp'], {
          state: { otp: response.data },
        });
        await this.loadingService.hide();
      },
      error: async (err) => {
        await this.loadingService.hide();
        await this.toastService.show(err.error.message, 2000, 'Error', 'top');
        console.error('Login failed:', err);
      },
    });
  }
}
