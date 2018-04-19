import {AbstractControl} from "@angular/forms";

export class PasswordValidators{
  static shouldMatch(control: AbstractControl){
    let newPassword = control.get('newPassword').value;
    let confirmPassword = control.get('confirmPassword').value;
    if(newPassword !== confirmPassword) return {shouldMatch:true};
    else return null;
  }
}

