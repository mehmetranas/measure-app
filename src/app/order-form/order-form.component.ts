import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '../redux/stores/app.store';
import {CustomerModel} from '../models/customer.model';
import {OrderService} from './order.service';
import {OrderModel} from '../models/order.model';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit, OnDestroy{
  @select((s: IAppState) => {return {customer: s.customerForm, order: s.order}}) state$;
  private subscription;
  public state: any = {};
  public isCustomerAdded = false;
  constructor(ngRedux: NgRedux<IAppState>) { }

  ngOnInit(){
    this.subscription = this.state$.subscribe((s) => {
      this.state = s;
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
