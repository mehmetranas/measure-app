import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from '../order-form/order.service';
import {OrderModel} from '../models/order.model';
import {locations, mountTypes, products} from '../helpers';
import {OrderLineModel} from '../models/order-line.model';
import {orderlinesPropertiesReducer} from '../redux/stores/orderlineProperties.store';
import {OrderlineService} from '../order-line-form/orderline.service';

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
  public orderlines: {key:string,value:any}[] = [];
  public showPending = false;
  constructor(private activatedRouter: ActivatedRoute,
              private orderService: OrderService,
              private orderlineService: OrderlineService) { }

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
        response.orderLineDetailList.forEach((orderlineDetail,index) => {
          for(let prop in orderlineDetail){
            this.orderlines.push({
              key:prop,
              value:orderlineDetail[prop]
            });
          }
        })
      })
  }

  public delete(id:number){
    this.showPending = true;
    this.orderlineService.deleteById(id)
      .finally(() => this.showPending = false)
      .subscribe(() => {
        const index = this.responseOrder
          .orderLineDetailList.findIndex((ol) => ol.id === id);
        if(index>-1) this.responseOrder.orderLineDetailList.splice(index,1);
      })
  }

}
