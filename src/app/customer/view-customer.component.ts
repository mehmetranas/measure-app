import {Component, Input, OnInit} from '@angular/core';
import {CustomerModel} from '../models/customer.model';

@Component({
  selector: 'app-view-customer',
  template: `
  <div class="container">
    <div class="row">
      <div class="col-md-4 offset-md-1">
        <div class="card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p>
              {{ customer.address }}
            </p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">{{ customer.nameSurname }}</li>
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
            <a href="#" class="card-link">Card link</a>
            <a href="#" class="card-link">Another link</a>
          </div>
        </div>
      </div>
      <div class="col-md-5">
        <h4>Son İşlemler</h4>
      </div>
    </div>
  </div>
   
  `,
  styles: []
})
export class ViewCustomerComponent implements OnInit {
  @Input() customer: CustomerModel = new CustomerModel(null);

  constructor() { }

  ngOnInit() {
  }

}
