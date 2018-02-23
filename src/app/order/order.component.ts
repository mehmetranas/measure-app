import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from '../order-form/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public order;
  constructor(private activatedRouter: ActivatedRoute,
              private orderService: OrderService) { }

  ngOnInit() {
    let orderId;
    this.activatedRouter.params.take(1).subscribe(params => orderId = +params['id']);
    this.orderService.getOrder(orderId)
      .subscribe()

  }

}
