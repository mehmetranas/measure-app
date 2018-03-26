import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CustomerModel} from '../models/customer.model';

@Component({
  selector: 'app-view-customer',
  template: `
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <mat-card class="customer-card">
          <mat-card-content>
            <ul class="list-group list-group-flush">
              <li class="list-group-item flex-items">
                <span><i class="fa fa-user-circle"></i> &nbsp; {{customer.nameSurname | uppercase}} &nbsp;</span>
                <span class="fill-remaining-space"></span>
                <span><i class="fa fa-mobile"></i> &nbsp; {{ customer.mobilePhone }} &nbsp;</span>
                <span><i class="fa fa-phone"></i> &nbsp; {{ customer.fixedPhone }}</span>
              </li>
              <li class="list-group-item">
                <span class="fa fa-map-marker"></span> &nbsp; {{customer.address}}
              </li>
            </ul>
          </mat-card-content>
        </mat-card>
        <hr>
      </div>
    </div>
  </div>
  `,
  styles: [`
    .customer-card {
     width: 100%;
    }
    .flex-items{
      display: flex;
    }
    .fill-remaining-space{
      flex: 1 1 auto;
    }
  `]
})
export class ViewCustomerComponent implements OnInit {
  @Input() customer: CustomerModel = new CustomerModel(null);

  constructor() { }

  ngOnInit() {
  }
}
