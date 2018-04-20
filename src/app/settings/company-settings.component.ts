import {Component, Input, OnInit} from '@angular/core';
import {CompanyModel} from "../models/company.model";
import {masks} from "../helpers";

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
                   type="tel"
                   [readonly]="!isEdit"
                   [textMask]="{mask:masks.phone,keepCharPositions:true,guide:false}"
                   placeholder="(999) 999-9999">
          </mat-form-field>
          <mat-form-field>
            <mat-label>Mail</mat-label>
            <input matInput name="email"
                   [(ngModel)]="company.email"
                   type="email"
                   [readonly]="!isEdit"
                   placeholder="ornek@ornek.com">
          </mat-form-field>
          <mat-form-field>
            <input matInput name="address"
                   [(ngModel)]="company.address"
                   class="text-capitalize"
                   type="text"
                   [readonly]="!isEdit"
                   placeholder="Adres">
          </mat-form-field>
        </div>
      </form>
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
  constructor() { }

  ngOnInit() {
    this.masks = masks;
  }

}
