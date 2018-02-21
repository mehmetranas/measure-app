import { Component, OnInit } from '@angular/core';
import {OrderService} from '../order-form/order.service';
import {OrderModel} from '../models/order.model';
import {LazyLoadEvent} from 'primeng/api';
import {orderStatus, orderStatusNameValue} from '../helpers';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  public dataSource: OrderModel[];
  public orders:OrderModel[];
  public totalRecords:number;
  public orderStatus = orderStatusNameValue;
  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getOrders().take(10).subscribe((response:any) => {
      console.log("ngOnInıt", response)
      this.orders = response;
      this.totalRecords = this.orders.length;
    },
      (err) => console.log(err));
  }

  public loadOrdersLazy(event: LazyLoadEvent) {
    console.log(event)
    this.orderService.getOrders().take(event.first).subscribe((response:any) => {
      console.log("lazy load", response)
      this.orders = response;
      this.totalRecords = this.orders.length;
    });

  }
}
