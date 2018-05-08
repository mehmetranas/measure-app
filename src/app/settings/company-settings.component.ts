import {Component, Input, OnInit} from '@angular/core';
import {CompanyModel} from '../models/company.model';
import {masks} from '../helpers';
import {SettingsService} from './settings.service';
import {MatSnackBar} from '@angular/material';
import {AuthService} from '../auth/services/login.service';
import {TenantModel} from "../super-admin/models/models";

@Component({
  selector: 'app-company-settings',
  template: `
    <div fxLayout="row" fxLayoutAlign="center center">
      <span>Şirket Bilgileri</span>
    </div>
    <ng-container *ngIf="clonedCompany && !isPending;else pending">
      <form #form="ngForm">
        <div fxLayout="column" fxLayoutAlign="start center">
          <mat-form-field>
            <input matInput name="name"
                   [(ngModel)]="clonedCompany.tenantName"
                   class="text-capitalize"
                   type="text"
                   required
                   [readonly]="!isEdit"
                   placeholder="Şirket İsmi">
          </mat-form-field>
          <mat-form-field>
            <mat-label>Telefon</mat-label>
            <input matInput name="phone"
                   [(ngModel)]="clonedCompany.phone"
                   type="tel"
                   [readonly]="!isEdit"
                   [textMask]="{mask:masks.phone,keepCharPositions:true,guide:false}"
                   placeholder="(999) 999-9999">
          </mat-form-field>
          <mat-form-field>
            <mat-label>Mail</mat-label>
            <input matInput name="email"
                   [(ngModel)]="clonedCompany.email"
                   type="email" required email
                   [readonly]="!isEdit"
                   placeholder="ornek@ornek.com">
          </mat-form-field>
          <mat-form-field>
            <input matInput name="address"
                   [(ngModel)]="clonedCompany.address"
                   class="text-capitalize"
                   type="text"
                   [readonly]="!isEdit"
                   placeholder="Adres">
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
export class CompanySettingsComponent implements OnInit {
  @Input() company: TenantModel;
  @Input() isEdit = false;
  public clonedCompany: TenantModel; // should clone because object reference problem was occurred
  private originalCompany: TenantModel;
  public isPending = false;
  public masks;

  constructor(private settingsService: SettingsService, private authService: AuthService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.masks = masks;
    this.clonedCompany = {...this.company};
  }

  public editUser() {
    this.isEdit = true;
    this.originalCompany = {...this.clonedCompany};
  }

  public saveModel() {
    this.isEdit = false;
    if (!this.clonedCompany) { return; }
    this.isPending = true;
    this.settingsService.updateCompany(this.clonedCompany)
      .take(1)
      .finally(() => this.isPending = false)
      .subscribe(() => {
        this.authService.company$.next(this.clonedCompany);
        this.snackBar.open('Bilgileriniz güncenlendi', 'Tamam', {duration: 5000});
      });
  }

  public cancelEdit() {
    this.isEdit = false;
    this.clonedCompany = {...this.originalCompany};
    this.originalCompany = null;
  }
}
