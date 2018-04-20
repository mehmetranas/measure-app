import {Component, Input, OnInit} from '@angular/core';
import {masks} from "../helpers";
import {NewPasswordDialogComponent} from "../dialogs/new-password-dialog.component";
import {SettingsService} from "./settings.service";
import {UserModel} from "../models/user.model";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-user-settings',
  template: `
    <div fxLayout="row" fxLayoutAlign="center center">
      <span>Kullanıcı Bilgileri</span>
    </div>
    <ng-container *ngIf="user">
      <form #form="ngForm">
        <div fxLayout="column" fxLayoutAlign="start center">
          <mat-form-field>
            <input matInput name="name"
                   [(ngModel)]="user.userName"
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
                   type="tel"
                   [readonly]="!isEdit"
                   [textMask]="{mask:masks.phone,keepCharPositions:true,guide:false}"
                   placeholder="(999) 999-9999">
          </mat-form-field>
          <mat-form-field>
            <mat-label>Mail</mat-label>
            <input matInput name="email"
                   [(ngModel)]="user.email"
                   type="email"
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
    </ng-container>
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
  public masks;

  constructor(private settingsService: SettingsService,private dialog:MatDialog) { }

  ngOnInit() {
    this.masks = masks;
  }

  public editUser(){
    this.isEdit = true;
  }

  public saveUser(){
    this.isEdit = false;
    if(!this.user) return;
    this.settingsService.updateUser(this.user)
      .take(1)
      .subscribe()
  }

  public changePassword(){
    this.dialog.open(NewPasswordDialogComponent);
  }
}
