import {Component, Input, OnInit} from '@angular/core';
import {CompanyModel} from "../models/company.model";
import {masks} from "../helpers";
import {SettingsService} from "./settings.service";

@Component({
  selector: 'app-company-settings',
  template: `
    <div fxLayout="row" fxLayoutAlign="center center">
      <span>Şirket Bilgileri</span>
    </div>
    <ng-container *ngIf="company">
      <form #form="ngForm">
        <div fxLayout="column" fxLayoutAlign="start center">
          <mat-form-field>
            <input matInput name="name"
                   [(ngModel)]="company.name"
                   class="text-capitalize"
                   type="text"
                   required
                   [readonly]="!isEdit"
                   placeholder="Şirket İsmi">
          </mat-form-field>
          <mat-form-field>
            <mat-label>Telefon</mat-label>
            <input matInput name="phone"
                   [(ngModel)]="company.phone"
                   type="tel" required
                   [readonly]="!isEdit"
                   [textMask]="{mask:masks.phone,keepCharPositions:true,guide:false}"
                   placeholder="(999) 999-9999">
          </mat-form-field>
          <mat-form-field>
            <mat-label>Mail</mat-label>
            <input matInput name="email"
                   [(ngModel)]="company.email"
                   type="email" required email
                   [readonly]="!isEdit"
                   placeholder="ornek@ornek.com">
          </mat-form-field>
          <mat-form-field>
            <input matInput name="address"
                   [(ngModel)]="company.address"
                   class="text-capitalize"
                   type="text" required
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
              <button mat-icon-button color="warn" (click)="isEdit=false"><span>İptal</span>
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

  `,
  styles: [`
    .mat-form-field{
      width: 40%;
    }
  `]
})
export class CompanySettingsComponent implements OnInit {
  @Input() company: CompanyModel;
  @Input() isEdit: boolean = false;
  public masks;
  constructor(private settingsService:SettingsService) { }

  public editUser(){
    this.isEdit = true;
  }

  public saveModel(form){
    this.isEdit = false;
    if(!this.company) return;
      this.settingsService.updateCompany(this.company)
        .take(1)
        .subscribe()
  }


  ngOnInit() {
    this.masks = masks;
  }

}
