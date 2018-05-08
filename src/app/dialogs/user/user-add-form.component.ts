import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {UserModel} from '../../models/user.model';
import {masks} from '../../helpers';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PasswordValidators} from '../../helpers/password.validators';

@Component({
  selector: 'app-user-add-form',
  templateUrl: './user-add-form.component.html',
  styleUrls: ['./user-add-form.component.css']
})
export class UserAddFormComponent implements OnInit {
  public user: UserModel;
  public roles:any[];
  public userCloned: UserModel;
  public masks;
  public form: FormGroup;
  public confirmPassword; // necessary for form group validation
  public isPending = false;
  public isEdit: boolean;
  public addAdmin: boolean;

  constructor(
    public dialogRef: MatDialogRef<UserAddFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      role: new FormControl(null, Validators.required),
      nameSurname: new FormControl(null, Validators.required),
      phone: new FormControl(null),
      email: new FormControl(null, [Validators.required, Validators.email]),
      passwordsField: new FormGroup({
        newPassword: new FormControl(null, [Validators.required, Validators.maxLength(10), Validators.minLength(6)]),
        confirmPassword: new FormControl(null, Validators.required)
        }, PasswordValidators.shouldMatch
      )
    });
    this.roles =[{value:2,viewValue:'Çalışan'},{value:3,viewValue:'Terzi'}];
    this.user = {...this.data.user} || new UserModel();
    this.isEdit = this.data.isEdit || false;
    this.addAdmin = this.data.addAdmin || false;
    this.masks = masks;
    if (this.isEdit) {
    this.form.removeControl('passwordsField');
    this.form.removeControl('role')
    }
    if(this.addAdmin){
      this.form.removeControl('role')
    }
  }

  public saveUser() {
    if (!this.user) { return; }
    this.dialogRef.close({
      user:this.user
    });
  }

}
