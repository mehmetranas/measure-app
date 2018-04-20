import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CustomerModel} from '../models/customer.model';
import {masks} from '../helpers';

@Component({
  selector: 'app-customer-form',
  template: `
      <form #form="ngForm">
        <div class="form-container">
          <mat-form-field>
            <input matInput name="nameSurname" class="text-capitalize"
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
        </div>
      </form>
      <button *ngIf="displaySaveButton"
              [disabled]="form.invalid"
              type="button" mat-raised-button
              class="float-right"
              (click)="submitForm()"
              color="primary">Kaydet
      </button>
  `,
  styles: [`
    .form-container {
      display: flex;
      flex-direction: column;
      margin-left: 2.5rem;
    }
    .form-container > * {
      width: 100%;
    }
    .button-row {
      align-items: center;
      justify-content: space-around;
    }
  `]
})
export class CustomerFormComponent implements OnInit {
  @Output() customerFormEmit: EventEmitter<CustomerModel> = new EventEmitter<CustomerModel>();
  @Input() customer:CustomerModel = new CustomerModel(null);
  @Input() displaySaveButton:boolean = true;
  public masks;
  constructor() { }

  ngOnInit() {
    this.masks = masks;
  }

  public submitForm() {
    this.customerFormEmit.emit(this.customer);
  }
}
