import { Component, OnInit } from '@angular/core';
import {OrderService} from '../order-form/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  public orders$;
  constructor(private orderService: OrderService) { }

  ngOnInit() {
    // this.orders$ = await this.orderService.getOrders()
    this.orderService.getOrders().subscribe(response => console.log("order",response))
  }

}
