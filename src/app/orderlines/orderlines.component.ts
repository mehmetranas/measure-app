import {Component, Input, OnInit} from '@angular/core';
import {IAppState} from '../redux/stores/app.store';
import {select} from '@angular-redux/store';
import {fontTypes, locations, mechanismTypes, mountTypes, products} from '../helpers';
import {OrderLineModel} from '../models/order-line.model';

@Component({
  selector: 'app-orderlines',
  templateUrl: './orderlines.component.html',
  styleUrls: ['./orderlines.component.css']
})
export class OrderlinesComponent implements OnInit {
  @Input() orderlines: OrderLineModel[];
  @select((s: IAppState) => s.orderlines) orderlines$;
  public locations = locations;
  public products = products;
  public mountTypes = mountTypes;
  public mechanismTypes = mechanismTypes;
  public  fontTypes = fontTypes;
  constructor() { }

  ngOnInit() {
  }
  public delete(id:number){

  }
}
