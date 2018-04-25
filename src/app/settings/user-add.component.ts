import { Component, OnInit } from '@angular/core';
import {SettingsService} from "./settings.service";
import {UserModel} from "../models/user.model";
import {MatDialog} from "@angular/material";
import {UserAddFormComponent} from "../dialogs/user-add-form.component";

@Component({
  selector: 'app-user-add',
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <mat-card class="mat-elevation-z8">
            <mat-card-content fxLayout="row" fxLayoutAlign="center center" fxFill>
              <ng-container *ngIf="admin;else icon1">
                <app-user></app-user>
              </ng-container>
              <ng-template #icon1>
                <button mat-icon-button (click)="actionOnCard('r1')">
                  <mat-icon class="app-lg-icon mat-icon-plus">add_circle_outline</mat-icon>
                </button>
              </ng-template>
            </mat-card-content>
          </mat-card>
        </div>
        <div class="col-md-6">
          <mat-card class="mat-elevation-z8">
            <mat-card-content fxLayout="row" fxLayoutAlign="center center" fxFill>
              <ng-container *ngIf="user1;else icon2">
                <app-user></app-user>
              </ng-container>
              <ng-template #icon2>
                <button mat-icon-button (click)="actionOnCard('r2')">
                  <mat-icon class="app-lg-icon mat-icon-plus">add_circle_outline</mat-icon>
                </button>
              </ng-template>
            </mat-card-content>              
          </mat-card>
        </div>
        <div class="w-100"></div>
        <div class="col-md-6">
          <mat-card class="mat-elevation-z8">
            <mat-card-content fxLayout="row" fxLayoutAlign="center center" fxFill>
              <ng-container *ngIf="user2;else icon3">
                <app-user></app-user>
              </ng-container>
              <ng-template #icon3>
                <button mat-icon-button (click)="actionOnCard('r3')">
                  <mat-icon class="app-lg-icon mat-icon-plus">add_circle_outline</mat-icon>
                </button>
              </ng-template>
            </mat-card-content>
          </mat-card>
        </div>
        <div class="col-md-6">
          <mat-card class="mat-elevation-z8">
            <mat-card-content fxLayout="row" fxLayoutAlign="center center" fxFill>
            <ng-container *ngIf="tailor;else icon4">
              <app-user></app-user>
            </ng-container>
              <ng-template #icon4>
                <button mat-icon-button (click)="actionOnCard('r4')">
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
  `],
  providers:[SettingsService]
})
export class UserAddComponent implements OnInit {
  public admin:UserModel;
  public user1:UserModel;
  public user2:UserModel;
  public tailor:UserModel;

  constructor(private settingsService:SettingsService,private dialog:MatDialog) { }

  ngOnInit() {
    this.settingsService.getTenantUsers()
      .take(1)
      .subscribe((users) => this.setUsersArray(users))
  }

  public actionOnCard(role:string){
    const dialogRef = this.dialog.open(UserAddFormComponent,{
      data:role
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
