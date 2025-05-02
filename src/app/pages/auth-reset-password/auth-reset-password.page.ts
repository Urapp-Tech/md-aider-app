import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { BackHeaderComponent } from 'src/app/components/back-title-header/back-title-header.component';
import { FieldErrorMessageComponent } from 'src/app/components/field-error-message/field-error-message.component';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';
import { passwordMismatchValidation } from 'src/app/utilities/password-mismatch-validation';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';
import { SharedModule } from 'src/modules/shared.module';

@Component({
  selector: 'app-auth-reset-password',
  templateUrl: 'auth-reset-password.page.html',
  styleUrls: ['auth-reset-password.page.scss'],
  standalone: true,
  imports: [
    IonicSharedModule,
    SharedModule,
    FieldErrorMessageComponent,
    BackHeaderComponent,
  ],
})
export class AuthResetPasswordPage implements OnInit {
  constructor(
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly navController: NavController,
    private readonly toastService: ToastService,
    private readonly loadingService: LoadingService,
    private authService: AuthService
  ) {}

  data: any;

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

  ngOnInit() {
    const navState = history.state;
    console.log('PAPAPA 2 rest', navState);

    if (navState && navState.data) {
      this.data = navState.data;
    }
  }

  async submit() {
    if (this.resetForm.invalid) {
      this.resetForm.markAllAsTouched();
      return;
    }
    const { newPassword, confirmPassword } = this.resetForm.getRawValue();

    if (newPassword !== confirmPassword) {
      await this.toastService.show(
        'Password does not match, Please enter same password on both fields',
        2000,
        'Error',
        'top'
      );
      return;
    }

    await this.loadingService.show();
    this.authService
      .newPassword({
        email: this.data.email,
        otp: this.data.otp,
        password: newPassword,
      })
      .subscribe({
        next: async (response) => {
          console.log('res', response.data);
          this.navController.navigateRoot(['/sign-in']);
          await this.toastService.show(
            response.message,
            2000,
            'Success',
            'top'
          );
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
