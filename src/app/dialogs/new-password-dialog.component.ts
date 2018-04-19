import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-new-password-dialog',
  template: `
    <div class="container">
      <mat-card>
        <mat-card-subtitle class="text-center">Şifre Değiştirme</mat-card-subtitle>
        <div fxLayout="column" fxLayoutAlign="center center">
          <mat-form-field>
            <input matInput name="currentPassword" placeholder="Mevcut Şifre" type="password" autocomplete="off" #current>
            <button mat-icon-button matSuffix (click)="current.type = current.type === 'text' ? 'password':'text'" color="primary">
              <mat-icon class="app-sm-icon">{{ current.type === 'password' ? 'visibility':'visibility_off' }}</mat-icon>
            </button>
          </mat-form-field>
          <mat-form-field>
            <input matInput name="newPassword" placeholder="Yeni Şifre" type="password" autocomplete="off" #new>
            <button mat-icon-button matSuffix (click)="new.type = new.type === 'text' ? 'password':'text'" color="primary">
              <mat-icon class="app-sm-icon">{{ new.type === 'password' ? 'visibility':'visibility_off' }}</mat-icon>
            </button>
          </mat-form-field>
          <mat-form-field>
            <input matInput name="passwordCheck" placeholder="Yeni Şifre Tekrar" type="password" autocomplete="off" #check>
            <button mat-icon-button matSuffix (click)="check.type = check.type === 'text' ? 'password':'text'" color="primary">
              <mat-icon class="app-sm-icon">{{ check.type === 'password' ? 'visibility':'visibility_off' }}</mat-icon>
            </button>
          </mat-form-field>
          <mat-card-actions>
            <div fxLayout="row" fxLayoutGap="20px">
              <button mat-icon-button color="warn">
                <span>İptal</span>
                <mat-icon class="app-sm-icon">cancel</mat-icon>
              </button>
              <button mat-icon-button color="primary">
                <span>Kaydet</span>
                <mat-icon class="app-sm-icon">save</mat-icon>
              </button>
            </div>
          </mat-card-actions>
        </div>
      </mat-card>
    </div>
  `,
  styles: []
})
export class NewPasswordDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NewPasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
