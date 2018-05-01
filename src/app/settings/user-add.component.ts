import {Component, OnInit} from '@angular/core';
import {SettingsService} from './settings.service';
import {UserModel} from '../models/user.model';
import {MatDialog} from '@angular/material';
import {UserAddFormComponent} from '../dialogs/user/user-add-form.component';
import {ConfirmDialogComponent} from "../dialogs/confirm-dialog.component";
import {finalize, take} from 'rxjs/operators';
import "rxjs/add/operator/take";
import "rxjs/add/operator/finally";

@Component({
  selector: 'app-user-add',
  template: `
    <div class="container">
      <div class="row">
        <ng-container *ngIf="!isPending;else pending">
          <ng-container
            *ngTemplateOutlet="userTemp; context:{user:users[0],type:'Yönetici',classType:'fa fa-briefcase',index:0,role:1}"></ng-container>
          <ng-container
            *ngTemplateOutlet="userTemp; context:{user:users[1],type:'Çalışan 1',classType:'fa fa-user',index:1,role:2}"></ng-container>
          <div class="w-100"></div>
          <ng-container
            *ngTemplateOutlet="userTemp; context:{user:users[2],type:'Çalışan 2',classType:'fa fa-user',index:2,role:2}"></ng-container>
          <ng-container
            *ngTemplateOutlet="userTemp; context:{user:users[3],type:'Terzi',classType:'fa fa-cut',index:3,role:3}"></ng-container>
        </ng-container>
      </div>
    </div>
    <ng-template #pending>
      <div fxLayout="column" fxLayoutAlign="center center" fxFill>
        <mat-spinner [diameter]="30"></mat-spinner>
      </div>
    </ng-template>
    <ng-template #userTemp let-user="user" let-type="type" let-classType="classType" let-index="index" let-role="role">
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
            <mat-card-actions *ngIf="role === 2 || role === 3">
              <div fxLayout="row" fxLayoutAlign="end center" [id]="user.id">
                <button mat-icon-button color="warn" (click)="deleteUser(user,index,role)">Sil</button>
              </div>
            </mat-card-actions>
          </ng-container>
          <ng-template #icon>
            <button mat-icon-button class="app-add-button" (click)="addUser(user,index)">
              <mat-icon class="app-lg-icon mat-icon-plus">add_circle_outline</mat-icon>
            </button>
          </ng-template>
        </mat-card>
      </div>
    </ng-template>
  `,
  styles: [`
    .mat-card {
      width: 100%;
      height: auto;
      margin-bottom: 20px;
      border-radius: 10px;
      background: #ffffff;
      min-height: 35vh;
    }

    .mat-card:hover {
      background: #e8e8e8;
    }

    .mat-card:hover .mat-icon-plus {
      color: #009688;
    }

    .mat-icon-plus {
      color: #3f51b58a;
    }

    .app-add-button {
      position: absolute;
      top: 45%;
      right: 45%;
    }
  `],
  providers: [SettingsService]
})
export class UserAddComponent implements OnInit {
  public users: UserModel[] = [];
  public admin: UserModel;
  public user1: UserModel;
  public user2: UserModel;
  public tailor: UserModel;
  public isPending = false;

  constructor(private settingsService: SettingsService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.isPending = true;
    this.settingsService.getTenantUsers()
      .pipe(
        take(1),
        finalize(() => this.isPending = false)
      )
      .subscribe((users: UserModel[]) => {
        this.setUsersArray(users);
        this.users.push(this.admin, this.user1, this.user2, this.tailor);
      });
  }

  public addUser(user: UserModel, index: number) {
    const dialogRef = this.dialog.open(UserAddFormComponent, {
      data: {
        user: user,
        isEdit: !user.id,
      },
      autoFocus: true
    });
    dialogRef.afterClosed()
      .takeWhile(data => data)
      .switchMap((data: any) => {
        user = {...data.user};
        this.isPending = true;
        return this.settingsService.registerUser(user)
          .pipe(
            take(1),
            finalize(() => this.isPending = false)
          )
      })
      .subscribe((userId:number) => {
        user.id = userId;
        this.users[index] = {...user};
      })
  }

  public deleteUser(user: UserModel, index, role) {
    if (user.id === null) return;
    const dialogRef = this.dialog.open(ConfirmDialogComponent,
      {
        data:
          {message: `${user.nameSurname} isimli kullanıcıyı silmek istediğinizden emin misiniz?`}
      });
    dialogRef.afterClosed()
      .take(1)
      .switchMap((data: any) => {
        if (data.answer) {
          this.isPending = true;
          return this.settingsService.deleteUser(user.id);
        }
      })
      .finally(() => this.isPending = false)
      .subscribe(() => this.users[index] = new UserModel(role));
  }

  private setUsersArray(users: UserModel[]) {
    this.admin = users.filter((user: UserModel) => user.role === 'r1')[0] || new UserModel(1);
    this.tailor = users.filter((user: UserModel) => user.role === 'r3')[0] || new UserModel(3);
    const user1And2 = users.filter((user: UserModel) => user.role === 'r2');
    this.user1 = user1And2[0] || new UserModel(2);
    this.user2 = user1And2[1] || new UserModel(2);
  }
}
