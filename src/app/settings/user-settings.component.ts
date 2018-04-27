import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {masks} from '../helpers';
import {NewPasswordDialogComponent} from '../dialogs/new-password-dialog.component';
import {SettingsService} from './settings.service';
import {UserModel} from '../models/user.model';
import {MatDialog, MatSnackBar} from '@angular/material';
import {AuthService} from '../auth/services/login.service';
import 'rxjs/add/operator/finally';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-user-settings',
  template: `
      <div fxLayout="row" fxLayoutAlign="center center">
        <span>Kullanıcı Bilgileri</span>
      </div>
      <ng-container *ngIf="userCloned && !isPending; else pending">
          <form #form="ngForm">
            <div fxLayout="column" fxLayoutAlign="start center">
              <mat-form-field>
                <input matInput name="nameSurname"
                       [(ngModel)]="userCloned.nameSurname"
                       class="text-capitalize"
                       type="text"
                       required
                       [readonly]="!isEdit"
                       placeholder="İsim - Soyisim">
              </mat-form-field>
              <mat-form-field>
                <mat-label>Telefon</mat-label>
                <input matInput name="phone"
                       [(ngModel)]="userCloned.phone"
                       type="tel"
                       [readonly]="!isEdit"
                       [textMask]="{mask:masks.phone,keepCharPositions:true,guide:false}"
                       placeholder="(999) 999-9999">
              </mat-form-field>
              <mat-form-field>
                <mat-label>Mail</mat-label>
                <input matInput name="email"
                       [(ngModel)]="userCloned.email"
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
export class UserSettingsComponent implements OnInit, OnDestroy {
  @Input() user;
  @Input() isEdit = false;
  private originalUser: UserModel;
  private subs: Subscription;
  public userCloned: UserModel; // should clone because object reference problem was occurred
  public isPending = false;
  public masks;

  constructor(private settingsService: SettingsService,
              private dialog: MatDialog,
              private authService: AuthService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.masks = masks;
    this.userCloned = {...this.user};
  }

  ngOnDestroy() {
    if (this.subs) { this.subs.unsubscribe(); }
  }

  public editUser() {
    this.isEdit = true;
    this.originalUser = {...this.userCloned};
  }

  public saveModel() {
    this.isEdit = false;
    if (!this.userCloned) { return; }
    this.isPending = true;
    this.settingsService.updateUser(this.userCloned)
      .take(1)
      .finally(() => this.isPending = false)
      .subscribe(() => {
        this.authService.user$.next({...this.userCloned});
        this.snackBar.open('Bilgileriniz güncenlendi', 'Tamam', {duration: 5000});
      });
  }

  public changePassword() {
    this.dialog.open(NewPasswordDialogComponent);
  }

  public cancelEdit() {
    this.isEdit = false;
    this.userCloned = {...this.originalUser};
    this.originalUser = null;
  }
}
