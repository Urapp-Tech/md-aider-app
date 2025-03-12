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
    path: 'sign-up',
    loadComponent: () =>
      import('./pages/auth-sign-up/auth-sign-up.page').then(
        (c) => c.AuthSignUpPage
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
  {
    path: 'scan-disease',
    loadComponent: () =>
      import('./pages/scan-disease/scan-disease.page').then(
        (c) => c.ScanDiseasePage
      ),
  },
  {
    path: 'patients-log',
    loadComponent: () =>
      import('./pages/patients-log/patients-log.page').then(
        (c) => c.PatientsLogPage
      ),
  },
  {
    path: 'patient-profile',
    loadComponent: () =>
      import('./pages/patient-profile/patient-profile.page').then(
        (c) => c.PatientProfilePage
      ),
  },
  {
    path: 'patient-add',
    loadComponent: () =>
      import('./pages/patient-add/patient-add.page').then(
        (c) => c.PatientAddPage
      ),
  },
  {
    path: 'doctor-profile',
    loadComponent: () =>
      import('./pages/doctor-profile/doctor-profile.page').then(
        (c) => c.DoctorProfilePage
      ),
  },
  {
    path: 'doctor-profile-add/:doctorId',
    loadComponent: () =>
      import('./pages/doctor-profile-add/doctor-profile-add.page').then(
        (c) => c.DoctorProfileAddPage
      ),
  },
];
