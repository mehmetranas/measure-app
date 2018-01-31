import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {NgRedux} from '@angular-redux/store';
import {tassign} from 'tassign';
import {IAppState} from '../app.store';
import {ADD} from '../sidenav/customerForm.actions';
import {ICustomerFormState} from './customerForm.store';
import {CustomerService} from './customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(private ngRedux: NgRedux<IAppState>, private customerService: CustomerService) { }

  ngOnInit() {
  }

  public addCustomer(customerForm: NgForm) {
    this.customerService.add(customerForm.value);
    this.ngRedux.dispatch({type: ADD, data: customerForm});
  }
}
