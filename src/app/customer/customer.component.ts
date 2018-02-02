import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../redux/stores/app.store';
import {ADD_CUSTOMER} from '../redux/redux.actions';
import {CustomerService} from './customer.service';
import {CustomerModel} from '../models/customer.model';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  @Output() customerAdded = new EventEmitter<boolean>(); // to hide component after customer created successfully; It should remove after add nextStep property
  public isEdit = true;
  public customer: CustomerModel = new CustomerModel();

  constructor(private ngRedux: NgRedux<IAppState>, private customerService: CustomerService) { }

  ngOnInit() {
  }

  public addCustomer(button: HTMLFormElement) {
    this.customerService.add(this.customer)
      .subscribe(c => console.log(c),
        e => console.log(e));
    this.ngRedux.dispatch({type: ADD_CUSTOMER, customer: this.customer});
    this.isEdit = false;
  }

  public editCustomer() {
  }
}
