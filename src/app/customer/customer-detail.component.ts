import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CustomerModel} from '../models/customer.model';
import {CustomerService} from './customer.service';
import {OrderService} from '../order-form/order.service';
import 'rxjs/add/operator/takeWhile';
import {OrderModel} from "../models/order.model";

@Component({
  selector: 'app-customer-detail',
  template: `
    <app-view-customer [customer]="customer"></app-view-customer>
    <ng-container *ngIf="orders">
      <app-orders [orders]="orders" [isLazyLoad]="false"></app-orders>
    </ng-container>
  `,
  styles: []
})
export class CustomerDetailComponent implements OnInit {
  public customerId: number;
  public customer: CustomerModel = new CustomerModel(null);
  public orders: OrderModel[];
  constructor(private route: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit() {
    this.customerId = this.route.snapshot.params["id"];
    this.orderService.getOrdersByCustomerId(this.customerId)
      .take(1)
      .subscribe((orders:OrderModel[]) => {
        if(orders[0].customer)
        this.customer =  orders[0].customer;
        this.orders = orders;
      });
  }
}
