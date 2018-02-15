import {Component, Input, OnInit} from '@angular/core';
import {OrderLineModel} from '../models/order-line.model';
import {mechanismTypes, mountTypes, fontTypes, locations, products} from '../helpers';

@Component({
  selector: 'app-orderline',
  templateUrl: './orderline.component.html',
  styleUrls: ['./orderline.component.css']
})
export class OrderlineComponent implements OnInit {

  @Input() orderline: OrderLineModel = new OrderLineModel();
  public locations = locations;
  public products = products;
  public mountTypes = mountTypes;
  public mechanismTypes = mechanismTypes;
  public  fontTypes = fontTypes;
  constructor() { }

  ngOnInit() {
  }

}
