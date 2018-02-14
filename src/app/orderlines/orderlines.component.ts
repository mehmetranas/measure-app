import { Component, OnInit } from '@angular/core';
import {IAppState} from '../redux/stores/app.store';
import {select} from '@angular-redux/store';
import {LocationService} from '../order-form/location.service';
import {ProductService} from '../order-form/product.service';

@Component({
  selector: 'app-orderlines',
  templateUrl: './orderlines.component.html',
  styleUrls: ['./orderlines.component.css']
})
export class OrderlinesComponent implements OnInit {
  @select((s: IAppState) => s.orderlines) orderlines$;
  public locations = [];
  public products = [];
  constructor(private locationService: LocationService,
              private productService: ProductService) { }

  ngOnInit() {
    this.locations = this.locationService.get();
    this.products = this.productService.get();
  }

}
