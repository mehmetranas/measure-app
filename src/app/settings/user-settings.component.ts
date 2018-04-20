import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {masks} from "../helpers";
import {NewPasswordDialogComponent} from "../dialogs/new-password-dialog.component";
import {SettingsService} from "./settings.service";
import {UserModel} from "../models/user.model";
import {MatDialog, MatSnackBar} from "@angular/material";
import {AuthService} from "../auth/services/login.service";
import "rxjs/add/operator/finally";

@Component({
  selector: 'app-user-settings',
  template: `
      <div fxLayout="row" fxLayoutAlign="center center">
        <span>Kullanıcı Bilgileri</span>
      </div>
      <ng-container *ngIf="user && !isPending; else pending">
          <form #form="ngForm">
            <div fxLayout="column" fxLayoutAlign="start center">
              <mat-form-field>
                <input matInput name="name"
                       [(ngModel)]="user.name"
                       class="text-capitalize"
                       type="text"
                       required
                       [readonly]="!isEdit"
                       placeholder="Ad">
              </mat-form-field>
              <mat-form-field>
                <input matInput name="surname"
                       [(ngModel)]="user.surname"
                       class="text-capitalize"
                       type="text"
                       required
                       [readonly]="!isEdit"
                       placeholder="Soyad">
              </mat-form-field>
              <mat-form-field>
                <mat-label>Telefon</mat-label>
                <input matInput name="phone"
                       [(ngModel)]="user.phone"
                       type="tel" required
                       [readonly]="!isEdit"
                       [textMask]="{mask:masks.phone,keepCharPositions:true,guide:false}"
                       placeholder="(999) 999-9999">
              </mat-form-field>
              <mat-form-field>
                <mat-label>Mail</mat-label>
                <input matInput name="email"
                       [(ngModel)]="user.email"
                       type="email" required email
                       [readonly]="!isEdit"
                       placeholder="ornek@ornek.com">
              </mat-form-field>
              <mat-form-field>
                <mat-label>Şifre</mat-label>
                <input matInput name="companyPhone"
                       value="password"
                       type="password"
                       readonly
                       placeholder="Şifre">
                <button mat-icon-button matSuffix (click)="changePassword()" color="primary">
                  <mat-icon class="app-sm-icon" matTooltip="Şifreyi değiştir">autorenew</mat-icon>
                </button>
              </mat-form-field>
            </div>
          </form>
        <div fxLayout="row" fxLayoutAlign="center">
          <div fxFlexOffset="50">
            <ng-container *ngIf="!isEdit;else save">
              <button mat-icon-button color="accent" type="button" (click)="editUser()"><span>Düzenle</span>
                <mat-icon class="app-sm-icon">mode_edit</mat-icon>
              </button>
            </ng-container>
            <ng-template #save>
              <div fxLayout="row" fxLayoutGap="20px">
                <button mat-icon-button color="warn" (click)="isEdit=false"><span>İptal</span>
                  <mat-icon class="app-sm-icon">cancel</mat-icon>
                </button>
                <button mat-icon-button color="primary"
                        [disabled]="form.invalid"
                        (click)="saveModel()"><span>Kaydet</span>
                  <mat-icon class="app-sm-icon">save</mat-icon>
                </button>
              </div>
            </ng-template>
          </div>
        </div>
      </ng-container>
    <ng-template #pending>
      <div fxLayout="column" fxLayoutAlign="center center">
        <mat-spinner [diameter]="40"></mat-spinner>
      </div>
    </ng-template>
  `,
  styles: [`
    .mat-form-field{
      width: 40%;
    }
  `]
})
export class UserSettingsComponent implements OnInit {
  @Input() user: UserModel;
  @Input() isEdit: boolean = false;
  public isPending:boolean = false;
  public masks;

  constructor(private settingsService: SettingsService,private dialog:MatDialog,private authService:AuthService,private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.masks = masks;
  }

  public editUser(){
    this.isEdit = true;
  }

  public saveModel(){
    this.isEdit = false;
    if(!this.user) return;
    this.isPending = true;
    this.settingsService.updateUser(this.user)
      .take(1)
      .finally(() => this.isPending = false)
      .subscribe(() => {
        Object.assign(this.authService.user,this.user);
        this.snackBar.open("Bilgileriniz güncenlendi","Tamam",{duration:5000})
      })
  }

  public changePassword(){
    this.dialog.open(NewPasswordDialogComponent);
  }
}
