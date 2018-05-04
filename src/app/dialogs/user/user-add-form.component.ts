import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {UserModel} from '../../models/user.model';
import {masks} from '../../helpers';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PasswordValidators} from '../../helpers/password.validators';
import {SettingsService} from '../../settings/settings.service';

@Component({
  selector: 'app-user-add-form',
  templateUrl: './user-add-form.component.html',
  styleUrls: ['./user-add-form.component.css'],
  providers: [SettingsService]
})
export class UserAddFormComponent implements OnInit {
  public user: UserModel;
  public userCloned: UserModel;
  public masks;
  public form: FormGroup;
  public confirmPassword; // necessary for form group validation
  public isPending = false;

  constructor(
    public dialogRef: MatDialogRef<UserAddFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      nameSurname: new FormControl(null, Validators.required),
      phone: new FormControl(null),
      email: new FormControl(null, [Validators.required, Validators.email]),
      passwordsField: new FormGroup({
        newPassword: new FormControl(null, [Validators.required, Validators.maxLength(10), Validators.minLength(6)]),
        confirmPassword: new FormControl(null, Validators.required)
        }, PasswordValidators.shouldMatch
      )
    });
    this.user = {...this.data.user};
    this.masks = masks;
    if (this.user.id) {
    this.form.removeControl('passwordsField');
    }
  }

  public saveUser() {
    if (!this.user) { return; }
    this.user.username = this.user.email;
    this.dialogRef.close({
      user:this.user
    });
  }

}
