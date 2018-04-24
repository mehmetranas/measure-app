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
      <app-orders *ngIf="order" 
                  [orders]="[order]" 
                  [isTailor]="authService.user.role == 'r3'" 
                  [isLazyLoad]="false"
                  [orderlines]="orderlines"
                  [singleRow]="true"></app-orders>
      <hr>
      <app-orderlines *ngIf="orderlines"
                      [responsive]="true" [order]="order"
                      [isTailor]="authService.user.role == 'r3'"
                      [addedPossibilty]="addedPossibilty"
                      [orderlines]="orderlines" #orderlinesCmp></app-orderlines>
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
  public orderlines: OrderLineModel[];
  public order: OrderModel;
  private sub: Subscription;
  public addedPossibilty = false;
  public searchTerm: string;
  constructor(private activatedRouter: ActivatedRoute,
              public router: Router,
              public authService: AuthService,
              private orderService: OrderService) { }

  ngOnInit() {
    this.addedPossibilty = !(this.authService.user.role == 'r3');
    this.searchTerm = this.activatedRouter.snapshot.queryParams["searchTerm"];
    this.orderlinesById();
  }

  ngOnDestroy(){
    if(this.sub)
      this.sub.unsubscribe()
  }

  private orderlinesById(){
    this.sub = this.activatedRouter.params
      .switchMap((params:any) => {
        const orderId = +params['id'];
        return this.getOrderlines(orderId)
      }).subscribe((orderlines:OrderLineModel[]) => this.orderlines = orderlines);
  }

  private getOrderlines(orderId) {
    return this.orderService
      .getOrder(orderId)
      .map((response:any) => {
        this.order = response.order;
        this.addedPossibilty = !(response.order.orderStatus === 4 || response.order.orderStatus === 5) && !(this.authService.user.role == 'r3');
        return response.orderLineDetailList
      })

  }

  public goToOrders() {
    window.history.back()
  }
}
