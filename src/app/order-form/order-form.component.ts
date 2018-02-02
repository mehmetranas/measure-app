import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '../app.store';
import {CustomerModel} from '../models/customer.model';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit, OnDestroy{
  @select((s: IAppState) => s.customerForm) customer$;
  private subscription;
  public customer: CustomerModel = new CustomerModel();
  public isCustomerAdded = false;
  constructor(ngRedux: NgRedux<IAppState>) { }

  ngOnInit(){
    this.subscription = this.customer$.subscribe((c) => this.customer = c);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
