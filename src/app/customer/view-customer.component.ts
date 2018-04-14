import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CustomerModel} from '../models/customer.model';
import {ReportModel} from "../models/report.model";
import {OrderModel} from "../models/order.model";
import {CustomerBriefModel} from "../models/customerBrief.model";

@Component({
  selector: 'app-view-customer',
  template: `
    <div class="container-fluid main">
      <div class="row">
        <div class="col-md-12">
          <mat-card>
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
                  <div><span>{{ customer.mobilePhone }}</span></div>
                  <div><span>{{ customer.fixedPhone }}</span></div>
                </div>
                <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="25px">
                  <mat-icon class="app-sm-icon">location_on</mat-icon>
                  <div>
                    <span>{{customer.address}}</span>
                  </div>
                </div>
              </div>
            </mat-card-subtitle>
            <hr>
            <mat-card-content>
                  <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="25px">
                    <div><mat-icon class="app-sm-icon">account_balance_wallet</mat-icon></div>
                    <div style="width: 100%" fxLayout="row" fxLayoutAlign="space-evenly center">
                      <div class="detail" fxLayout="column">
                        <div class="app-wallet"><span>Sipariş Adedi</span></div>
                        <div>
                          {{ customerBrief?.count }} Adet
                        </div>
                      </div>
                      <div class="detail" fxLayout="column">
                        <div class="app-wallet"><span>Tutar</span></div>
                        <div>
                          {{ customerBrief?.sum | currency:"TRY":"symbol-narrow":"1.0-0":"tr" }}
                        </div>
                      </div>
                      <div class="detail" fxLayout="column">
                        <div class="app-wallet"><span>Ödenen</span></div>
                        <div>
                          {{ customerBrief?.deposite | currency:"TRY":"symbol-narrow":"1.0-0":"tr" }}
                        </div>
                      </div>
                      <div class="detail" fxLayout="column">
                        <div class="app-wallet"><span>Kalan</span></div>
                        <div>
                          {{ customerBrief?.remain | currency:"TRY":"symbol-narrow":"1.0-0":"tr" }}
                        </div>
                      </div>
                    </div>
                  </div>
            </mat-card-content>
          </mat-card>      
        </div>
      </div>
    </div>
  `,
  styles: [`
   .mat-icon:not(.app-sm-icon){
     font-size: 48px;
   }
   .mat-card-subtitle{
     color:rgba(0, 0, 0, 0.71);
   }
   .main{
     margin-bottom: 20px;
     color: black;
   }
   .mat-card{
     background: linear-gradient(45deg,#dee2e600,#c0c0c0b8);
     color: black;
   }
   .app-wallet{
     border-bottom: 1px #000000 solid;
     font-weight: bold;
   }
   .detail{
     font-size: 1rem;
   }
  `]
})
export class ViewCustomerComponent implements OnInit {
  @Input() customer: CustomerModel;
  @Input() orders: OrderModel[];
  public customerBrief: CustomerBriefModel;

  constructor() { }

  ngOnInit() {
    this.orderBrief(this.orders);
  }

  private orderBrief(orders: OrderModel[]){
    this.customerBrief = new CustomerBriefModel();
    this.customerBrief.count = orders.length;
    let sum: number = 0;
    let deposite: number = 0;
    orders.forEach((om:OrderModel) => {
      if(!om.totalAmount) om.totalAmount = 0;
      if(!om.depositeAmount) om.depositeAmount = 0;
      sum += om.totalAmount;
      deposite += om.depositeAmount;
    });
    this.customerBrief.deposite = deposite;
    this.customerBrief.sum = sum;
    this.customerBrief.remain = sum -deposite;
  }
}
