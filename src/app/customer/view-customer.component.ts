import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CustomerModel} from '../models/customer.model';

@Component({
  selector: 'app-view-customer',
  template: `
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <mat-card class="customer-card">
          <mat-card-header>
            <div mat-card-avatar><mat-icon>account_box</mat-icon></div>
            <mat-card-title><p class="text-capitalize">{{customer.nameSurname}}</p></mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <ul class="list-group list-group-flush">
              <li class="list-group-item"><span class="fa fa-map-marker"></span> &nbsp; {{customer.address}}</li>
              <li class="list-group-item"><span class="fa fa-mobile"></span> &nbsp; {{ customer.mobilePhone }}</li>
              <li class="list-group-item"><span class="fa fa-phone"></span> &nbsp; {{ customer.fixedPhone }}</li>
            </ul>
          </mat-card-content>
          <mat-card-actions>
            <div class="button-row">
            <button mat-button color="primary" (click)="editCustomer.emit(customer)">Düzenle</button>
              
            </div>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  </div>
  `,
  styles: [`
    .customer-card {
      max-width: 400px;
    }
    .button-row {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  `]
})
export class ViewCustomerComponent implements OnInit {
  @Output() editCustomer: EventEmitter<CustomerModel> = new EventEmitter<CustomerModel>();
  @Input() customer: CustomerModel = new CustomerModel(null);

  constructor() { }

  ngOnInit() {
  }
}
