import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../order-form/order.service';
import {OrderLineModel} from '../models/order-line.model';
import {OrderModel} from '../models/order.model';
import {AuthService} from "../auth/services/login.service";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-order',
  template: `
    <ng-container *ngIf="orderlines$">
      <app-orderlines [responsive]="true" [order]="order"
                      [isTailor]="authService.user.role == 'r3'"
                      [addedPossibilty]="addedPossibilty"
                      [displayOrder]="true"
                      [orderlines]="(orderlines$ | async)"></app-orderlines>
    </ng-container>
    <hr>
    <button mat-icon-button color="accent" (click)="goToOrders()">
      <mat-icon>arrow_back</mat-icon>
    </button>
  `,
  styles: [`
    .order{
      margin-bottom: 20px;
    }
  `]
})
export class OrderComponent implements OnInit, OnDestroy {
  public orderlines$: Observable<OrderLineModel[]>;
  public order: OrderModel;
  private sub: Subscription;
  public addedPossibilty = false;
  constructor(private activatedRouter: ActivatedRoute,
              public router: Router,
              public authService: AuthService,
              private orderService: OrderService) { }

  ngOnInit() {
    this.addedPossibilty = !(this.authService.user.role == 'r3');
      this.sub = this.activatedRouter.params
      .subscribe((params:any) => {
        const orderId = +params['id'];
        this.orderlines$ = this.orderService
          .getOrder(orderId)
          .map((response:any) => {
            this.order = response.order;
            this.addedPossibilty = !(response.order.orderStatus === 4 || response.order.orderStatus === 5) && !(this.authService.user.role == 'r3');
            return response.orderLineDetailList
          })
      })
  }

  ngOnDestroy(){
    if(this.sub)
      this.sub.unsubscribe()
  }

  public goToOrders() {
    window.history.back()
  }
}
