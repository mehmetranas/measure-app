import {Component, Input, OnInit} from '@angular/core';
import {fontTypes, locations, mechanismTypes, mountTypes, products} from '../helpers';
import {OrderLineModel} from '../models/order-line.model';
import {OrderlineService} from '../order-line-form/orderline.service';
import 'rxjs/add/operator/finally';

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
  public showPending = false;

  constructor(private orderlineService: OrderlineService) { }

  ngOnInit() {
    this.cols = [
      {field:"locationType",header:"Mekan"},
      {field:"locationName",header:"Kapı/Pen"},
      {field:"productValue",header:"Perde"},
      {field:"lineAmount",header:"Fiyat"},
    ]
  }
  public delete(id: number){
    this.showPending = true;
    this.orderlineService.deleteById(id)
      .finally(() => this.showPending=false)
      .subscribe(() => {
        const index = this.orderlines.findIndex((ol) => ol.id === id);
        if(index>-1) this.orderlines.splice(index,1);
        },
        (err) => console.log(err));
  }
}
