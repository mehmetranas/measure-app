import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CustomerModel} from '../models/customer.model';

@Component({
  selector: 'app-view-customer',
  template: `
  <div class="container">
    <div class="row">
      <div class="col-md-4 offset-md-1">
        <div class="card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">{{ customer.nameSurname }}</h5>
            <p>
              {{ customer.address }}
            </p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">{{ customer.mobilePhone }}</li>
            <li class="list-group-item">{{ customer.fixedPhone }}</li>
            <li class="list-group-item">
                 <span>Kampanya:
                   <ng-container *ngIf="customer.newsletterAccepted; else notAccepted">
                     <mat-icon color="primary" class="align-middle float-right">check_box</mat-icon>
                   </ng-container>
                   <ng-template #notAccepted>
                     <mat-icon color="warn" class="align-middle float-right">indeterminate_check_box</mat-icon>
                   </ng-template>
                 </span>
            </li>
          </ul>
          <div class="card-body">
            <button class="btn btn-link card-link btn-sm" (click)="this.deleteCustomer.emit(customer)">Sil</button>
            <button class="btn btn-link card-link btn-sm" (click)="this.editCustomer.emit(customer)">Düzenle</button>
          </div>
        </div>
      </div>
    </div>
  </div>
   
  `,
  styles: []
})
export class ViewCustomerComponent implements OnInit {
  @Output() editCustomer: EventEmitter<CustomerModel> = new EventEmitter<CustomerModel>();
  @Output() deleteCustomer: EventEmitter<CustomerModel> = new EventEmitter<CustomerModel>();
  @Input() customer: CustomerModel = new CustomerModel(null);

  constructor() { }

  ngOnInit() {
  }
}
