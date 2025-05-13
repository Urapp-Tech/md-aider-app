import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { FieldErrorMessageComponent } from 'src/app/components/field-error-message/field-error-message.component';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';
import { SharedModule } from 'src/modules/shared.module';
import { AuthService } from 'src/app/services/auth.service';
import { NavController } from '@ionic/angular/standalone';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';
import { CapacitorStorageService } from 'src/app/services/capacitor-storage.service';

@Component({
  selector: 'app-auth-sign-in',
  templateUrl: 'auth-sign-in.page.html',
  styleUrls: ['auth-sign-in.page.scss'],
  standalone: true,
  imports: [IonicSharedModule, SharedModule, FieldErrorMessageComponent],
})
export class AuthSignInPage {
  constructor(
    private readonly formBuilder: NonNullableFormBuilder,
    private authService: AuthService,
    private readonly navController: NavController,
    private readonly userService: UserService,
    private readonly loadingService: LoadingService,
    private readonly toastService: ToastService,
    private readonly capacitorStorageService: CapacitorStorageService
  ) {}

  passwordVisible = false;

  signInForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  navigateToForgotPassword() {
    return this.navController.navigateRoot(['/forgot-password']);
  }

  async submit() {
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }
    const { email, password } = this.signInForm.getRawValue();

    await this.loadingService.show();

    this.authService.loginUser({ identifier: email, password }).subscribe({
      next: async (response) => {
        this.userService.userData = response.data;
        await this.capacitorStorageService.setItem(
          'USER_DATA',
          response.data.token
        );
        await this.loadingService.hide();

        this.navController.navigateRoot('/home', { replaceUrl: true });
      },
      error: async (err) => {
        await this.loadingService.hide();
        await this.toastService.show(err.error.message, 2000, 'Error', 'top');
        console.error('Login failed:', err);
      },
    });
  }
}
