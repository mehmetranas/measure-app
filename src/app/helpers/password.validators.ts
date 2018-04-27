import {AbstractControl} from '@angular/forms';

export class PasswordValidators {
  static shouldMatch(control: AbstractControl) {
    const newPassword = control.get('newPassword').value;
    const confirmPassword = control.get('confirmPassword').value;
    if (newPassword !== confirmPassword) { return {shouldMatch: true}; } else { return null; }
  }
}

