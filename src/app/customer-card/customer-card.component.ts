import { Component, OnInit } from '@angular/core';
import {IAppState} from '../app.store';
import {select} from '@angular-redux/store';

@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.css']
})
export class CustomerCardComponent implements OnInit {
  @select((s: IAppState) => s.customerForm) customer; // get customer info from redux
  public panelOpenState = false;
  constructor() { }

  ngOnInit() {
  }

}
