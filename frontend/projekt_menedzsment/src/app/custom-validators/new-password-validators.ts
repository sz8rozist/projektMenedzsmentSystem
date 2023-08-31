import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const newPassword = control.get('new_pw')?.value;
  const confirmPassword = control.get('confirm_new_pw')?.value;

  return newPassword === confirmPassword ? null : { passwordMismatch: true };
}