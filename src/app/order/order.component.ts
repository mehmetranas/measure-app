import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from '../order-form/order.service';
import {OrderModel} from '../models/order.model';
import {locations, mountTypes, products} from '../helpers';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public responseOrder: any= {};
  public cols: any[];
  public mountTypes = mountTypes;
  public productTypes = products;
  public locations = locations;
  constructor(private activatedRouter: ActivatedRoute,
              private orderService: OrderService) { }

  ngOnInit() {
    this.cols = [
      {field:"locationName",header:"Mekan"},
      {field:"product.productValue",header:"Perde Türü"},
      {field:"locationType",header:"Cam/Kapı"},
      {field:"propertyWidth",header:"En (cm)"},
      {field:"propertyHeight",header:"Boy (cm)"},
      {field:"mountType",header:"Montaj Türü"},
      {field:"unitPrice",header:"Birim Fiyat"}
    ];
    const orderId = this.activatedRouter.snapshot.params["id"];
    this.orderService.getOrder(orderId)
      .subscribe((response: any) => {
        this.responseOrder=response;
        for(let prop in this.responseOrder.orderLineDetailList[0]){
          console.log(prop)
        }
      })
  }

}
