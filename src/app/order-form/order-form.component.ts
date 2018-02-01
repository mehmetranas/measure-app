import { Component, OnInit } from '@angular/core';
import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '../app.store';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  public isCustomerAdded = false;
  @select((s: IAppState) => s.customerForm) customer;
  constructor(ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
  }

  displayActions($event: boolean) {
    this.isCustomerAdded = $event;
  }
}
