import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../app.store';
import {ADD} from '../redux.actions';
import {CustomerService} from './customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  @Output() isDisplay = new EventEmitter<boolean>(); // to hide component after customer created successfully;

  constructor(private ngRedux: NgRedux<IAppState>, private customerService: CustomerService) { }

  ngOnInit() {
  }

  public addCustomer(customerForm: NgForm) {
    console.log(customerForm);
    this.customerService.add(customerForm.value);
    this.ngRedux.dispatch({type: ADD, data: customerForm.value});
    customerForm.reset();
    this.isDisplay.emit(false);
  }
}
