import { Component, OnInit } from '@angular/core';
import {IAppState} from '../redux/stores/app.store';
import {select} from '@angular-redux/store';
import {locations, products} from '../helpers';

@Component({
  selector: 'app-orderlines',
  templateUrl: './orderlines.component.html',
  styleUrls: ['./orderlines.component.css']
})
export class OrderlinesComponent implements OnInit {
  @select((s: IAppState) => s.orderlines) orderlines$;
  public locations = locations;
  public products = products;
  constructor() { }

  ngOnInit() {
  }

}
