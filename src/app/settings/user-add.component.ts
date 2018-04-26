import { Component, OnInit } from '@angular/core';
import {SettingsService} from "./settings.service";
import {UserModel} from "../models/user.model";
import {MatDialog} from "@angular/material";
import {UserAddFormComponent} from "../dialogs/user/user-add-form.component";

@Component({
  selector: 'app-user-add',
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <mat-card class="mat-elevation-z8">
            <mat-card-subtitle class="text-center">Yönetici</mat-card-subtitle>
            <mat-card-content>
              <ng-container *ngIf="admin?.id;else icon1">
                <app-user></app-user>
              </ng-container>
              <ng-template #icon1>
                <button mat-icon-button class="app-add-button" (click)="actionOnCard(admin)">
                  <mat-icon class="app-lg-icon mat-icon-plus">add_circle_outline</mat-icon>
                </button>
              </ng-template>
            </mat-card-content>
          </mat-card>
        </div>
        <div class="col-md-6">
          <mat-card class="mat-elevation-z8">
            <mat-card-subtitle class="text-center">Normal Kullanıcı</mat-card-subtitle>
            <mat-card-content fxLayout="row" fxLayoutAlign="center center" fxFill>
              <ng-container *ngIf="user1?.id;else icon2">
                <app-user></app-user>
              </ng-container>
              <ng-template #icon2>
                <button mat-icon-button class="app-add-button" (click)="actionOnCard(user1)">
                  <mat-icon class="app-lg-icon mat-icon-plus">add_circle_outline</mat-icon>
                </button>
              </ng-template>
            </mat-card-content>              
          </mat-card>
        </div>
        <div class="w-100"></div>
        <div class="col-md-6">
          <mat-card class="mat-elevation-z8">
            <mat-card-subtitle class="text-center">Normal Kullanıcı 2</mat-card-subtitle>
            <mat-card-content fxLayout="row" fxLayoutAlign="center center" fxFill>
              <ng-container *ngIf="user2?.id;else icon3">
                <app-user></app-user>
              </ng-container>
              <ng-template #icon3>
                <button mat-icon-button class="app-add-button" (click)="actionOnCard(user2)">
                  <mat-icon class="app-lg-icon mat-icon-plus">add_circle_outline</mat-icon>
                </button>
              </ng-template>
            </mat-card-content>
          </mat-card>
        </div>
        <div class="col-md-6">
          <mat-card class="mat-elevation-z8">
            <mat-card-subtitle class="text-center">Terzi</mat-card-subtitle>
            <mat-card-content fxLayout="row" fxLayoutAlign="center center" fxFill>
            <ng-container *ngIf="tailor?.id;else icon4">
              <app-user></app-user>
            </ng-container>
              <ng-template #icon4>
                <button mat-icon-button class="app-add-button" (click)="actionOnCard(tailor)">
                  <mat-icon class="app-lg-icon mat-icon-plus">add_circle_outline</mat-icon>
                </button>
              </ng-template>
          </mat-card-content>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .mat-card{
      width: 100%;
      height: 40vh;
      margin-bottom: 20px;
      border-radius: 10px;
      background: transparent;
    }
    .mat-card:hover{
      /*cursor: pointer;*/
      background: #ffffff;
    }
    .mat-card:hover .mat-icon-plus{
      color: #009688;
    }
    .mat-icon-plus{
      color:#3f51b58a;
    }
    .app-add-button{
      position: absolute;
      top: 45%;
      right: 45%;
    }
  `],
  providers:[SettingsService]
})
export class UserAddComponent implements OnInit {
  public admin:UserModel = new UserModel();
  public user1:UserModel = new UserModel(2);
  public user2:UserModel = new UserModel(2);
  public tailor:UserModel = new UserModel(3);

  constructor(private settingsService:SettingsService,private dialog:MatDialog) { }

  ngOnInit() {
    this.settingsService.getTenantUsers()
      .take(1)
      .subscribe((users: UserModel[]) => this.setUsersArray(users))
  }

  public actionOnCard(user:UserModel){
    const dialogRef = this.dialog.open(UserAddFormComponent,{
      data:{
        user:user,
        isEdit:!user.id,
      },
      autoFocus:true
    });
  }

  private setUsersArray(users:UserModel[]){
    const adminIndex = users.findIndex((user:UserModel) => user.role === 'r1');
    if(adminIndex>-1) {
      this.admin = users[adminIndex];
      users.slice(adminIndex,1)
    }
    const user1Index = users.findIndex((user:UserModel) => user.role === 'r2');
    if(user1Index>-1) {
      this.user1 = users[user1Index];
      users.slice(user1Index,1)
    }
    const user2Index = users.findIndex((user:UserModel) => user.role === 'r2');
    if(user2Index>-1) {
      this.user2 = users[user2Index];
      users.slice(user2Index,1)
    }
    const tailor = users.findIndex((user:UserModel) => user.role === 'r3');
    if(tailor>-1) {
      this.tailor = users[tailor];
      users.slice(tailor,1)
    }
  }
}
