import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CustomerModel} from '../models/customer.model';

@Component({
  selector: 'app-customer-form',
  template: `
      <form #form="ngForm">
        <div class="form-container">
          <mat-form-field>
            <input matInput name="nameSurname"
                   [(ngModel)]="customer.nameSurname"
                   type="text"
                   required
                   placeholder="Ad Soyad">
          </mat-form-field>

          <mat-form-field>
            <input matInput name="mobilePhone"
                   [(ngModel)]="customer.mobilePhone"
                   type="tel"
                   required
                   placeholder="Mobil Tel">
          </mat-form-field>

          <mat-form-field>
            <input matInput name="fixedPhone"
                   [(ngModel)]="customer.fixedPhone"
                   type="tel"
                   placeholder="Sabit Tel">
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
    table{
      table-layout: ;
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
  constructor() { }

  ngOnInit() {
  }

  public submitForm() {
    this.customerFormEmit.emit(this.customer);
  }
}
