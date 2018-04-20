import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from "@angular/material";
import {SettingsService} from "../settings/settings.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PasswordValidators} from "../helpers/password.validators";

@Component({
  selector: 'app-new-password-dialog',
  template: `
    <div class="container">
      <mat-card>
        <mat-card-subtitle class="text-center">Şifre Değiştirme</mat-card-subtitle>
        <form [formGroup]="form">
          <div fxLayout="column" fxLayoutAlign="center center">
            <mat-form-field>
              <input matInput name="currentPassword" 
                     placeholder="Mevcut Şifre" 
                     [(ngModel)]="currentPassword"
                     type="password"
                     formControlName="currentPassword"
                     autocomplete="off"
                     #current>
              <button mat-icon-button matSuffix (click)="current.type = current.type === 'text' ? 'password':'text'"
                      color="primary">
                <mat-icon class="app-sm-icon">{{ current.type === 'password' ? 'visibility' : 'visibility_off' }}
                </mat-icon>
              </button>
            </mat-form-field>
             <mat-form-field formGroupName="updatePasswords">
               <input matInput
                      name="newPassword"
                      [(ngModel)]="newPassword"
                      placeholder="Yeni Şifre"
                      type="password"
                      formControlName="newPassword"
                      autocomplete="off" #new>
               <button mat-icon-button matSuffix (click)="new.type = new.type === 'text' ? 'password':'text'"
                       color="primary">
                 <mat-icon class="app-sm-icon">{{ new.type === 'password' ? 'visibility' : 'visibility_off' }}</mat-icon>
               </button>
             </mat-form-field>
            <span *ngIf="(form.get('updatePasswords.newPassword').hasError('minlength') || form.get('updatePasswords.newPassword').hasError('maxlength') ) && form.get('updatePasswords.newPassword').touched"
                  class="text-danger app-text-sm">
                Şifre uzunluğu 6'dan küçük 10'dan büyük olamaz
              </span>
             <mat-form-field formGroupName="updatePasswords">
               <input matInput
                      name="confirmPassword"
                      placeholder="Yeni Şifre Tekrar"
                      type="password"
                      formControlName="confirmPassword"
                      [(ngModel)]="confirmPassword"
                      autocomplete="nope"
                      #confirm>
               <button mat-icon-button matSuffix (click)="confirm.type = confirm.type === 'text' ? 'password':'text'"
                       color="primary">
                 <mat-icon class="app-sm-icon">{{ confirm.type === 'password' ? 'visibility' : 'visibility_off' }}
                 </mat-icon>
               </button>
             </mat-form-field>
              <span *ngIf="form.get('updatePasswords').hasError('shouldMatch') && form.get('updatePasswords.confirmPassword').touched" 
                    class="text-danger app-text-sm">
                Şifreler uyuşmuyor
              </span>
            <mat-card-actions>
              <div fxLayout="row" fxLayoutGap="20px">
                <button mat-icon-button color="warn" type="button" matDialogClose>
                  <span>İptal</span>
                  <mat-icon class="app-sm-icon">cancel</mat-icon>
                </button>
                <button mat-icon-button color="primary" [disabled]="form.invalid" type="button" (click)="changePassword()">
                  <span>Kaydet</span>
                  <mat-icon class="app-sm-icon">save</mat-icon>
                </button>
              </div>
            </mat-card-actions>
          </div>
        </form>
      </mat-card>
    </div>
  `,
  styles: [],
  providers: [SettingsService]
})
export class NewPasswordDialogComponent implements OnInit {
  public currentPassword;
  public confirmPassword;
  public newPassword;
  public form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<NewPasswordDialogComponent>,
    private settingsService: SettingsService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    this.form = new FormGroup({
      currentPassword:new FormControl(null,Validators.required),
      updatePasswords: new FormGroup({
        newPassword: new FormControl(null, [Validators.required,Validators.minLength(6),Validators.maxLength(10)]),
        confirmPassword: new FormControl(null,[Validators.required])
      },PasswordValidators.shouldMatch)
    })
  }

  public changePassword(){
    this.settingsService.changePassword(this.currentPassword,this.newPassword)
      .take(1)
      .subscribe((data:any) => this.dialogRef.close(),
        err => {
          this.snackBar.open("Şifre değiştrime başarısız","Tekrar dene");
        });
  }
}

