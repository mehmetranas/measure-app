import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from '../order-form/order.service';
import {Location} from '@angular/common';
import {OrderLineModel} from '../models/order-line.model';
import {OrderModel} from '../models/order.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public orderlines: OrderLineModel[] = [];
  constructor(private activatedRouter: ActivatedRoute,
              public locaiton: Location,
              private orderService: OrderService) { }

  ngOnInit() {
    const orderId = this.activatedRouter.snapshot.params["id"];
    this.orderService
      .getOrder(orderId)
      .subscribe((order: OrderModel) => this.orderlines = order.orderlines );
  }
}
