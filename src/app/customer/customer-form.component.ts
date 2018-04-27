import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CustomerModel} from '../models/customer.model';
import {masks} from '../helpers';

@Component({
  selector: 'app-customer-form',
  template: `
      <form #form="ngForm">
        <div class="app-form" fxLayout="column" fxLayoutAlign="start none">
          <mat-form-field>
            <input matInput name="nameSurname"
                   [(ngModel)]="customer.nameSurname"
                   class="text-capitalize"
                   type="text"
                   required
                   placeholder="Ad Soyad">
          </mat-form-field>
          <mat-form-field>
            <mat-label>Mobil Tel</mat-label>
            <input matInput name="mobilePhone"
                   [(ngModel)]="customer.mobilePhone"
                   type="tel"
                   required
                   [textMask]="{mask:masks.phone,keepCharPositions:true,guide:false}"
                   placeholder="(999) 999-9999">
          </mat-form-field>

          <mat-form-field>
            <mat-label>Sabit Tel</mat-label>
            <input matInput name="fixedPhone"
                   [(ngModel)]="customer.fixedPhone"
                   type="tel"
                   [textMask]="{mask:masks.phone,keepCharPositions:true,guide:false}"
                   placeholder="(999) 999-9999">
          </mat-form-field>
          <mat-form-field>
              <textarea matInput name="address"
                        [(ngModel)]="customer.address"
                        type="text"
                        required placeholder="Adres"></textarea>
          </mat-form-field>
          <mat-checkbox name="newsletterAccepted" color="primary"
                        [(ngModel)]="customer.newsletterAccepted">Kampanya Bilgilendirmesi
          </mat-checkbox>
          <div fxLayout="row" fxLayoutAlign="end center" fxFill>
            <button *ngIf="displaySaveButton"
                    [disabled]="form.invalid"
                    type="button" mat-raised-button
                    class="float-right"
                    (click)="submitForm()"
                    color="primary">Kaydet
            </button>
          </div>
        </div>
      </form>
  `,
  styles: [`
    .app-form{
      padding: 10px 3rem;
    }
  `]
})
export class CustomerFormComponent implements OnInit {
  @Output() customerFormEmit: EventEmitter<CustomerModel> = new EventEmitter<CustomerModel>();
  @Input() customer: CustomerModel = new CustomerModel(null);
  @Input() displaySaveButton = true;
  public masks;
  constructor() { }

  ngOnInit() {
    this.masks = masks;
  }

  public submitForm() {
    this.customerFormEmit.emit(this.customer);
  }
}
