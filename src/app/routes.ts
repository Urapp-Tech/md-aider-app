import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'splash', pathMatch: 'full' },
  {
    path: 'splash',
    loadComponent: () =>
      import('./pages/splash/splash.page').then((c) => c.SplashPage),
  },
  {
    path: 'onboarding',
    loadComponent: () =>
      import('./pages/onboarding/onboarding.page').then(
        (c) => c.OnboardingPage
      ),
  },
  {
    path: 'sign-in',
    loadComponent: () =>
      import('./pages/auth-sign-in/auth-sign-in.page').then(
        (c) => c.AuthSignInPage
      ),
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./pages/auth-forgot-password/auth-forgot-password.page').then(
        (c) => c.AuthForgotPasswordPage
      ),
  },
  {
    path: 'forgot-password-otp',
    loadComponent: () =>
      import(
        './pages/auth-forgot-password-otp/auth-forgot-password-otp.page'
      ).then((c) => c.AuthForgotPasswordOtpPage),
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import('./pages/auth-reset-password/auth-reset-password.page').then(
        (c) => c.AuthResetPasswordPage
      ),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.page').then((c) => c.HomePage),
  },
];
