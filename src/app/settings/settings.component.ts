import { Component, OnInit } from '@angular/core';
import {UserModel} from "../models/user.model";
import {AuthService} from "../auth/services/login.service";
import {masks} from "../helpers/index";
import {MatDialog} from "@angular/material";
import {NewPasswordDialogComponent} from "../dialogs/new-password-dialog.component";
import {SettingsService} from "./settings.service";
import "rxjs/add/operator/take";

@Component({
  selector: 'app-settings',
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <mat-card>
            <mat-card-title>
              <div fxLayout="row" fxLayoutAlign="center center">
               <span>Kullanıcı Bilgileri</span>
              </div>
            </mat-card-title>
              <ng-container *ngIf="user">
                <form #form="ngForm">
                  <div fxLayout="column" fxLayoutAlign="center center">
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
                             required
                             [readonly]="!isEdit"
                             [textMask]="{mask:masks.phone,keepCharPositions:true,guide:false}"
                             placeholder="(999) 999-9999">
                    </mat-form-field>
                    <mat-form-field>
                      <mat-label>Mail</mat-label>
                      <input matInput name="companyPhone"
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
            <mat-card-actions>
              <div fxLayout="row" fxFlexOffset="70" fxLayoutAlign="none center">
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
                      <button mat-icon-button color="primary" (click)="saveUser()"><span>Kaydet</span>
                        <mat-icon class="app-sm-icon">save</mat-icon>
                      </button>
                    </div>
                  </ng-template>
              </div>
            </mat-card-actions>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .mat-form-field{
      width: 40%;
    }
  `],
  providers: [SettingsService]
})
export class SettingsComponent implements OnInit {
  public user: UserModel;
  public masks;
  public isEdit: boolean = false;

  constructor(private authService:AuthService,private settingsService:SettingsService,private dialog:MatDialog) { }

  ngOnInit() {
    this.masks = masks;
    this.user = new UserModel(this.authService.user.name,this.authService.user.surname,this.authService.user.email,this.authService.user.phone);
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
