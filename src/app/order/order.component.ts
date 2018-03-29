import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from '../order-form/order.service';
import {Location} from '@angular/common';
import {OrderLineModel} from '../models/order-line.model';
import {OrderModel} from '../models/order.model';

@Component({
  selector: 'app-order',
  template: `
    <app-orderlines [responsive]="true" [addedPossibilty] = "addedPossibilty" [order]="order"
                    [orderlines]="orderlines"></app-orderlines>
    <hr>
    <button mat-icon-button color="accent" (click)="locaiton.back()">
      <mat-icon>arrow_back</mat-icon>
    </button>
  `,
  styles: [`
    .order{
      margin-bottom: 20px;
    }
  `]
})
export class OrderComponent implements OnInit {
  public orderlines: OrderLineModel[] = [];
  public order: OrderModel = new OrderModel();
  public addedPossibilty = false;
  constructor(private activatedRouter: ActivatedRoute,
              public locaiton: Location,
              private orderService: OrderService) { }

  ngOnInit() {
    const orderId = this.activatedRouter.snapshot.params["id"];
    this.orderService
      .getOrder(orderId)
      .subscribe((response: any) => {
        console.log(response.order);
        this.addedPossibilty = !(response.order.orderStatus === 4 || response.order.orderStatus === 5);
        this.orderlines = response.orderLineDetailList;
      });
  }
}
