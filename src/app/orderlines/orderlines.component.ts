import {Component, Input, OnInit} from '@angular/core';
import {fontTypes, locations, mechanismTypes, mountTypes, products} from '../helpers';
import {OrderLineModel} from '../models/order-line.model';

@Component({
  selector: 'app-orderlines',
  templateUrl: './orderlines.component.html',
  styleUrls: ['./orderlines.component.css']
})
export class OrderlinesComponent implements OnInit {
  @Input() orderlines: OrderLineModel[];
  public locations = locations;
  public products = products;
  public mountTypes = mountTypes;
  public mechanismTypes = mechanismTypes;
  public  fontTypes = fontTypes;
  public cols: any = [];
  constructor() { }

  ngOnInit() {
    this.cols = [
      {field:"",viewValue:"#"},
      {field:"locationType",viewValue:"Mekan"},
      {field:"locationName",viewValue:"Kapı/Pen"},
      {field:"lineAmount",viewValue:"Fiyat"},
      {field:"locationName",viewValue:"Sil"},
    ]
  }
  public delete(id:number){
    console.log(this.orderlines);
  }
}
