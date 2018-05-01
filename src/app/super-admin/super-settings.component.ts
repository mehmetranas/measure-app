import {Component, OnInit} from '@angular/core';
import {MatDialog, MatSnackBar} from "@angular/material";
import {NewPasswordDialogComponent} from "../dialogs/new-password-dialog.component";
import {HttpClient} from "@angular/common/http";
import {SuperModel} from "./models/models";
import {switchMap, takeWhile} from "rxjs/operators";
import {Observable} from "rxjs/Observable";

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
                                (click)="saveModel()"><span>Kaydet</span>
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
    

    <!--<div fxLayout="row" fxLayoutAlign="center center">-->
      <!--<span>Kullanıcı Bilgileri</span>-->
    <!--</div>-->
    
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
export class SuperSettingsComponent implements OnInit{

  public isEdit = false;
  private originalUser: SuperModel;
  public user: SuperModel;
  public isPending = false;

  constructor(private http: HttpClient,private dialog: MatDialog,private snackBar: MatSnackBar) { }

  ngOnInit(){
    this.user = new SuperModel();
    this.user.email = 'super_admin';
  }

  public editUser() {
    this.isEdit = true;
    this.originalUser = {...this.user};
  }

  public saveModel() {
    this.isEdit = false;
    if (!this.user) { return; }
    this.isPending = true;
    this.http.put("",this.user)
      .subscribe(() =>this.snackBar.open('Bilgileriniz güncenlendi', 'Tamam', {duration: 5000}));
  }

  public changePassword() {
    this.dialog.open(NewPasswordDialogComponent)
      .afterClosed()
      .pipe(
        takeWhile(data => data),
        switchMap(data => this.updatePasword(data.currentPassword,data.newPassword))
      )
      .subscribe(() => this.snackBar.open("Şifre değiştirme işlemi başarılı","Tamam"));
  }

  public cancelEdit() {
    this.isEdit = false;
    this.user = {...this.originalUser};
    this.originalUser = null;
  }

  private updatePasword(currentPassword: string, newPassword: string) {
    return Observable.of(true);
  }
}
