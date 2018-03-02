import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from '../order-form/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public responseOrder: any= {};
  constructor(private activatedRouter: ActivatedRoute,
              private orderService: OrderService) { }

  ngOnInit() {
    const orderId = this.activatedRouter.snapshot.params["id"];
    this.orderService
      .getOrder(orderId)
      .subscribe((response: any) => this.responseOrder=response);
  }
}
