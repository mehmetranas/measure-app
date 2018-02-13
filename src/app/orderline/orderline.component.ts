import {Component, Input, OnInit} from '@angular/core';
import {OrderLineModel} from '../models/order-line.model';
import {locations} from '../order-form/location.enum';

@Component({
  selector: 'app-orderline',
  templateUrl: './orderline.component.html',
  styleUrls: ['./orderline.component.css']
})
export class OrderlineComponent implements OnInit {

  @Input() orderline: OrderLineModel;
  public locations = locations;
  constructor() { }

  ngOnInit() {
  }

}
