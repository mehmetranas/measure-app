import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../app.store';
import {ADD} from '../redux.actions';
import {CustomerService} from './customer.service';
import {Customer} from '../models/customer.model';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  @Output() customerAdded = new EventEmitter<boolean>(); // to hide component after customer created successfully;
  public isDisabled: boolean;
  public customer: Customer = new Customer();

  constructor(private ngRedux: NgRedux<IAppState>, private customerService: CustomerService) { }

  ngOnInit() {
  }

  public addCustomer(button: HTMLFormElement) {
    this.customer.id =  this.customerService.add(this.customer);
    this.ngRedux.dispatch({type: ADD, customer: this.customer});
    this.customerAdded.emit(true);
    this.isDisabled= true;
  }

  public editCustomer() {
    console.log("editing")
  }
}
