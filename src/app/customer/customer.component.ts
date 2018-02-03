import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../redux/stores/app.store';
import {ADD_CUSTOMER} from '../redux/redux.actions';
import {CustomerService} from './customer.service';
import {CustomerModel} from '../models/customer.model';
import {OrderModel} from '../models/order.model';
import {OrderService} from '../order-form/order.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  @Output() customerAdded = new EventEmitter<boolean>(); // to hide component after customer created successfully; It should remove after add nextStep property
  public isEdit = true;
  public customer: CustomerModel = new CustomerModel();

  constructor(private ngRedux: NgRedux<IAppState>, private orderService: OrderService) { }

  ngOnInit() {
  }

  public addNewCustomerAndInitialOrder() {
    let order = new OrderModel();
    order.customer = this.customer;
    order.orderStatus = 0;

    this.orderService.add(order)
      .subscribe((res: OrderModel) => {
        console.log('Order', res);
        this.customer.id = res.customer.id;
        this.ngRedux.dispatch({type: ADD_CUSTOMER, customer: this.customer});
        },
        err => console.log(err));

    this.isEdit = false;
  }

  public editCustomer() {
  }
}
