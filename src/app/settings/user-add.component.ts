import { Component, OnInit } from '@angular/core';
import {SettingsService} from "./settings.service";
import {UserModel} from "../models/user.model";
import {MatDialog} from "@angular/material";
import {UserAddFormComponent} from "../dialogs/user/user-add-form.component";
import {finalize, take} from "rxjs/operators";

@Component({
  selector: 'app-user-add',
  template: `
    <div class="container">
      <div class="row">
        <ng-container *ngIf="!isPending;else pending">
          <ng-container *ngTemplateOutlet="userTemp; context:{user:admin,type:'Yönetici',classType:'fa fa-briefcase'}"></ng-container>
          <ng-container *ngTemplateOutlet="userTemp; context:{user:user1,type:'Çalışan 1',classType:'fa fa-user'}"></ng-container>
          <div class="w-100"></div>
          <ng-container *ngTemplateOutlet="userTemp; context:{user:user2,type:'Çalışan 2',classType:'fa fa-user'}"></ng-container>
          <ng-container *ngTemplateOutlet="userTemp; context:{user:tailor,type:'Terzi',classType:'fa fa-cut'}"></ng-container>
        </ng-container>
      </div>
    </div>
    <ng-template #pending>
      <div fxLayout="column" fxLayoutAlign="center center" fxFill>
        <mat-spinner [diameter]="30"></mat-spinner>
      </div>
    </ng-template>
    <ng-template #userTemp let-user="user" let-type="type" let-classType="classType">
      <div class="col-md-6">
        <mat-card class="mat-elevation-z8">
          <mat-card-subtitle>
            <div fxLayout="row" fxLayoutGap="10px" fxLayoutAlign="center center">
              <span [class]="classType"></span>
              <span>{{ type }}</span>
            </div>
          </mat-card-subtitle>
            <ng-container *ngIf="user?.id;else icon">
            <mat-card-content>
              <app-user [user]="user"></app-user>
              <mat-divider></mat-divider>
            </mat-card-content>
              <mat-card-actions>
                <div fxLayout="row" fxLayoutGap="20px" fxLayoutAlign="space-evenly center">
                  <button mat-raised-button color="warn" (click)="disableUser(user)">Pasif</button>
                  <button mat-raised-button color="primary" (click)="editUser(user)">Düzenle</button>
                </div>
              </mat-card-actions>
            </ng-container>
            <ng-template #icon>
              <button mat-icon-button class="app-add-button" (click)="actionOnCard(user)">
                <mat-icon class="app-lg-icon mat-icon-plus">add_circle_outline</mat-icon>
              </button>
            </ng-template>
        </mat-card>
      </div>
    </ng-template>
  `,
  styles: [`
    .mat-card{
      width: 100%;
      height: auto;
      margin-bottom: 20px;
      border-radius: 10px;
      background: transparent;
      min-height: 35vh;
    }
    .mat-card:hover{
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
  public isPending:boolean = false;

  constructor(private settingsService:SettingsService,private dialog:MatDialog) { }

  ngOnInit() {
    this.isPending = true;
    this.settingsService.getTenantUsers()
      .pipe(
        take(1),
        finalize(() => this.isPending = false)
      )
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

  public editUser(user: UserModel){
    this.actionOnCard(user);
  }

  public disableUser(user: UserModel){
    console.log(user)
  }

  private setUsersArray(users:UserModel[]){
    const adminIndex = users.findIndex((user:UserModel) => user.role === 'r1');
    if(adminIndex>-1) {
      this.admin = users[adminIndex];
      users.splice(adminIndex,1)
    }
    const user1Index = users.findIndex((user:UserModel) => user.role === 'r2');
    if(user1Index>-1) {
      this.user1 = users[user1Index];
      users.splice(user1Index,1)
    }
    const user2Index = users.findIndex((user:UserModel) => user.role === 'r2');
    if(user2Index>-1) {
      this.user2 = users[user2Index];
      users.splice(user2Index,1)
    }
    const tailor = users.findIndex((user:UserModel) => user.role === 'r3');
    if(tailor>-1) {
      this.tailor = users[tailor];
      users.splice(tailor,1)
    }
  }
}
