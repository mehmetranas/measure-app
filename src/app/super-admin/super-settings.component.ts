import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog, MatSnackBar} from "@angular/material";
import {NewPasswordDialogComponent} from "../dialogs/new-password-dialog.component";
import {HttpClient} from "@angular/common/http";
import {SuperModel} from "./models/models";
import {finalize, switchMap, take, takeWhile} from "rxjs/operators";
import {Observable} from "rxjs/Observable";
import {SettingsService} from "./user/settings.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-super-settings',
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-sm-8 offset-sm-2">
          <mat-card class="mat-elevation-z10">
            <mat-card-subtitle>Kullanıcı Bilgileri</mat-card-subtitle>
            <mat-card-content>
              <ng-container *ngIf="user && !isPending; else pending">
                <form #form="ngForm">
                  <div fxLayout="column" fxLayoutAlign="start center">
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
                      <input matInput name="password"
                             value="*******"
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
                        <button mat-icon-button color="warn" (click)="cancelEdit()"><span>İptal</span>
                          <mat-icon class="app-sm-icon">cancel</mat-icon>
                        </button>
                        <button mat-icon-button color="primary"
                                [disabled]="form.invalid"
                                (click)="updateMail()"><span>Kaydet</span>
                          <mat-icon class="app-sm-icon">save</mat-icon>
                        </button>
                      </div>
                    </ng-template>
                  </div>
                </div>
              </ng-container>
            </mat-card-content>
            <mat-card-actions>
            </mat-card-actions>
          </mat-card>
        </div>
      </div>
    </div>
    <ng-template #pending>
      <div fxLayout="column" fxLayoutAlign="center center">
        <mat-spinner [diameter]="40"></mat-spinner>
      </div>
    </ng-template>
  `,
  styles: [`
    .mat-form-field{
      width: 60%;
    }
  `]
})

export class SuperSettingsComponent implements OnInit, OnDestroy{

  public isEdit = false;
  private originalUser: SuperModel;
  public user: SuperModel = new SuperModel();
  public isPending = false;
  private sub: Subscription;

  constructor(private settingsService:SettingsService,
              private http: HttpClient,
              private dialog:MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit(){
    this.settingsService.getUser();
    this.sub = this.settingsService.user
      .subscribe((user:SuperModel) => {this.user = user;});
  }

  ngOnDestroy(){
    if(this.sub) this.sub.unsubscribe();
  }

  public editUser() {
    this.isEdit = true;
    this.originalUser = {...this.user};
  }

  public updateMail() {
    this.isEdit = false;
    if (!this.user) { return; }
    this.isPending = true;
    this.settingsService.updateMail(this.user)
      .pipe(
        take(1),
        finalize(() => this.isPending = false)
      )
      .subscribe(() =>this.snackBar.open('Bilgileriniz güncenlendi', 'Tamam', {duration: 5000}));
  }

  public changePassword() {
    this.dialog.open(NewPasswordDialogComponent)
      .afterClosed()
      .pipe(
        takeWhile(data => data),
        switchMap(data => {
          this.isPending = true;
          return this.settingsService.updatePassword(data.currentPassword,data.newPassword);
        })
      )
      .pipe(
        take(1),
        finalize(() => this.isPending = false)
      )
      .subscribe(() => this.snackBar.open("Şifre değiştirme işlemi başarılı","Tamam",{duration: 5000}));
  }

  public cancelEdit() {
    this.isEdit = false;
    this.user = {...this.originalUser};
    this.originalUser = null;
  }
}
