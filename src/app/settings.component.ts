import { Component, OnInit } from '@angular/core';
import {UserModel} from "./models/user.model";
import {AuthService} from "./auth/services/login.service";
import {masks} from "./helpers";

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
                      <input matInput name="companyName"
                             [(ngModel)]="user.companyName"
                             class="text-capitalize"
                             type="text"
                             required
                             [readonly]="!isEdit"
                             placeholder="Şirket İsmi">
                    </mat-form-field>
                    <mat-form-field>
                      <mat-label>Şirket Telefonu</mat-label>
                      <input matInput name="companyPhone"
                             [(ngModel)]="user.companyPhone"
                             type="tel"
                             required
                             [readonly]="!isEdit"
                             [textMask]="{mask:masks.phone,keepCharPositions:true,guide:false}"
                             placeholder="(999) 999-9999">
                    </mat-form-field>
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
                  </div>
                </form>
              </ng-container> 
            <mat-card-actions>
              <div class="row justify-content-end">
                <div class="col-md-4">
                  <ng-container *ngIf="!isEdit;else save">
                    <button mat-icon-button color="accent" (click)="editUser()"><span>Düzenle</span>
                      <mat-icon class="app-sm-icon">mode_edit</mat-icon>
                    </button>
                  </ng-container>
                  <ng-template #save>
                    <button mat-icon-button color="primary" (click)="saveUser()"><span>Kaydet</span>
                      <mat-icon class="app-sm-icon" color="primary">save</mat-icon>
                    </button>
                  </ng-template>
                </div>
              </div>
            </mat-card-actions>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class SettingsComponent implements OnInit {
  public user: UserModel;
  public masks;
  public isEdit: boolean = false;

  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.masks = masks;
    this.user = this.authService.user;
    console.log(this.authService.user)
  }

  public editUser(){
    this.isEdit = true;
  }

  public saveUser(){
    this.isEdit = false;
  }

}
