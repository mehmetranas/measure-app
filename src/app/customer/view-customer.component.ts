import {Component,Input} from '@angular/core';
import {CustomerModel} from '../models/customer.model';
import {OrderModel} from "../models/order.model";
import {OrderService} from "../order-form/order.service";

@Component({
  selector: 'app-view-customer',
  template: `
    <div class="container-fluid main">
      <div class="row">
        <div class="col-md-12">
          <mat-card class="mat-elevation-z5">
            <mat-card-title>
              <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="20px">
                <i class="fa fa-user"></i>  
                <span>{{customer.nameSurname | uppercase}}</span>
              </div>
            </mat-card-title>
            <mat-card-subtitle>
              <div fxLayout="column" fxLayoutAlign="center stretch" fxLayoutGap="20px">
                <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="25px">
                  <mat-icon class="app-sm-icon">contact_phone</mat-icon>
                  <div class="detail"><span>{{ customer.mobilePhone }}</span></div>
                  <div class="detail"><span>{{ customer.fixedPhone }}</span></div>
                </div>
                <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="25px">
                  <mat-icon class="app-sm-icon">location_on</mat-icon>
                  <div>
                    <span>{{customer.address}}</span>
                  </div>
                </div>
              </div>
            </mat-card-subtitle>
          </mat-card>      
        </div>
      </div>
    </div>
  `,
  styles: [`
   .mat-card-subtitle{
     color:rgba(0, 0, 0, 0.71);
   }
   .main{
     margin-bottom: 20px;
     color: black;
   }
   .mat-card{
     background: linear-gradient(0deg,#dee2e600,#c0c0c0b8);
     color: black;
   }
   .detail{
     font-size: 1rem;
   }
    @media (max-width: 768px) {
      .detail{
        
      }
    }
  `]
})
export class ViewCustomerComponent {
  @Input() customer: CustomerModel;
  @Input() orders: OrderModel[];

  constructor() { }
}
