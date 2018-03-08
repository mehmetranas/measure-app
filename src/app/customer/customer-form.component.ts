import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CustomerModel} from '../models/customer.model';

@Component({
  selector: 'app-customer-form',
  template: `
    <div class="col-md-4 offset-md-3">
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

          <mat-checkbox name="newsletterAccepted"
                        [(ngModel)]="customer.newsletterAccepted">Kampanya Bilgilendirmesi
          </mat-checkbox>
        </div>
      </form>
      <button [disabled]="form.invalid"
              type="button" mat-raised-button
              class="float-right"
              (click)="submitForm()"
              color="primary">Kaydet
      </button>
    </div>
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
  `]
})
export class CustomerFormComponent implements OnInit {
  @Input() customer:CustomerModel = new CustomerModel(null);
  @Output() customerFormEmit: EventEmitter<CustomerModel> = new EventEmitter<CustomerModel>();
  constructor() { }

  ngOnInit() {
  }

  public submitForm() {
    this.customerFormEmit.emit(this.customer);
  }
}
