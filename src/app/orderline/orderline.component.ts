import {Component, Input, OnInit} from '@angular/core';
import {OrderLineModel} from '../models/order-line.model';
import {LocationService} from '../order-form/location.service';
import {ProductService} from '../order-form/product.service';

@Component({
  selector: 'app-orderline',
  templateUrl: './orderline.component.html',
  styleUrls: ['./orderline.component.css']
})
export class OrderlineComponent implements OnInit {

  @Input() orderline: OrderLineModel = new OrderLineModel();
  public locations = [];
  public products = [];
  constructor(private locationService: LocationService,
              private productService: ProductService) { }

  ngOnInit() {
    this.locations = this.locationService.get();
    this.products = this.productService.get();
  }

}
