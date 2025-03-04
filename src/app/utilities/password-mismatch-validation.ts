import { AbstractControl } from '@angular/forms';

export function passwordMismatchValidation(
  newPasswordPath: string,
  confirmPasswordPath: string
) {
  return (abstractControl: AbstractControl<any, any>) => {
    const newPasswordControl = abstractControl.get(newPasswordPath);
    const confirmPasswordControl = abstractControl.get(confirmPasswordPath);
    if (!newPasswordControl || !confirmPasswordControl) {
      return null;
    }
    if (
      confirmPasswordControl.errors &&
      !confirmPasswordControl.errors['passwordMismatch']
    ) {
      return null;
    }

    if (newPasswordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
      return null;
    }
    confirmPasswordControl.setErrors(null);
    return null;
  };
}
