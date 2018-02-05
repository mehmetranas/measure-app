import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../redux/stores/app.store';
import {ADD_CUSTOMER, ADD_ORDER} from '../redux/redux.actions';
import {CustomerService} from './customer.service';
import {CustomerModel} from '../models/customer.model';
import {OrderModel} from '../models/order.model';
import {OrderService} from '../order-form/order.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit, OnDestroy {
  @Output() customerAdded = new EventEmitter<boolean>(); // to hide component after customer created successfully; It should remove after add nextStep property
  public isEdit = true;
  public customer: CustomerModel = new CustomerModel();
  public order: OrderModel = new OrderModel();
  private subscription: Subscription = new Subscription();

  constructor(private ngRedux: NgRedux<IAppState>, private customerService: CustomerService) { }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  public addNewCustomerAndInitialOrder() {

    this.subscription = this.customerService.addForDevMode(this.customer)
      .subscribe((res: any) => {
        this.customer.id = res.customerId;
        let order = new OrderModel(res.orderId, res.orderDate);
        this.ngRedux.dispatch({type: ADD_CUSTOMER, customer: this.customer});
        this.ngRedux.dispatch({type: ADD_ORDER, order: order });
        },
        err => console.log(err));

    this.isEdit = false;
  }

  public editCustomer() {
  }
}
