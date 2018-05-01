import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from "@angular/material";
import {TenantModel} from "../../super-admin/models/tenant.model";
import {TenantService} from "../../super-admin/services/tenant.service";
import {masks} from '../../helpers';
import {UserAddFormComponent} from "../../dialogs/user/user-add-form.component";

@Component({
  selector: 'app-tenant-add',
  template: `
    <div class="container">
      <mat-card>
        <mat-card-subtitle>Şirket Bilgileri</mat-card-subtitle>
        <ng-container *ngIf="tenantCloned && !isPending; else pending">
          <div fxLayout="column" fxLayoutAlign="center center">
            <form #form="ngForm">
              <div fxLayout="column" fxLayoutAlign="start center">
                <mat-form-field>
                  <input matInput name="name"
                         [(ngModel)]="tenantCloned.tenantName"
                         class="text-capitalize"
                         type="text"
                         required
                         placeholder="Şirket Adı">
                </mat-form-field>
                <mat-form-field>
                  <mat-label>Telefon</mat-label>
                  <input matInput name="phone"
                         [(ngModel)]="tenantCloned.phone"
                         type="tel"
                         [textMask]="{mask:masks.phone,keepCharPositions:true,guide:false}"
                         placeholder="(999) 999-9999">
                </mat-form-field>
                <mat-form-field>
                  <mat-label>Mail</mat-label>
                  <input matInput name="email"
                         [(ngModel)]="tenantCloned.email"
                         type="email"
                         placeholder="ornek@ornek.com">
                </mat-form-field>
                <mat-form-field>
                  <input matInput name="address"
                         [(ngModel)]="tenantCloned.address"
                         class="text-capitalize"
                         type="text"
                         placeholder="Adres">
                </mat-form-field>
              </div>
            </form>
            <mat-card-actions>
              <div fxLayout="row" fxLayoutAlign="center center">
                <div fxFlexOffset="50">
                    <div fxLayout="row" fxLayoutAlign="center" fxLayoutGap="20px">
                          <button mat-icon-button color="warn" matDialogClose><span>İptal</span>
                            <mat-icon class="app-sm-icon">cancel</mat-icon>
                          </button>
                          <button mat-icon-button color="primary"
                                  [disabled]="form.invalid"
                                  (click)="saveModel()"><span>Kaydet</span>
                            <mat-icon class="app-sm-icon">save</mat-icon>
                          </button>
                    </div>
                </div>
              </div>
            </mat-card-actions>
          </div>
        </ng-container>
      </mat-card>
    </div>
    <ng-template #pending>
      <div fxLayout="column" fxLayoutAlign="center center">
        <mat-spinner [diameter]="40"></mat-spinner>
      </div>
    </ng-template>
  `,
  styles: []
})
export class TenantAddComponent implements OnInit {
  public tenantCloned: TenantModel = new TenantModel(); // should clone because object reference problem was occurred
  public isPending = false;
  public masks;

  constructor(public dialogRef: MatDialogRef<UserAddFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private tenantService: TenantService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.masks = masks;
    if(this.data.tenant) {
      this.tenantCloned = {...this.data.tenant};
    }
  }

  public saveModel() {
    if (!this.tenantCloned) { return; }
    if(this.tenantCloned.id != null)
      this.editTenant();
    else
      this.saveTenant();
  }

  private editTenant() {
    this.isPending = true;
    this.tenantService.addTenant(this.tenantCloned)
      .take(1)
      .finally(() => this.isPending = false)
      .subscribe(() => {
        this.dialogRef.close({
          tenant:this.tenantCloned
        });
        this.snackBar.open('Bilgileriniz güncenlendi', 'Tamam', {duration: 5000});
      })

  }

  private saveTenant() {
    this.isPending = true;
    this.tenantService.addTenant(this.tenantCloned)
      .take(1)
      .finally(() => this.isPending = false)
      .subscribe((tenantId) => {
        this.tenantCloned.id = tenantId;
        this.dialogRef.close({
          tenant:this.tenantCloned
        });
        this.snackBar.open('Yeni kayıt oluşturuldu', 'Tamam', {duration: 5000});
      })
  }
}
