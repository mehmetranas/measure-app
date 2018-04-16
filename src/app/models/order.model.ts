import {CustomerModel} from './customer.model';
import {OnInit} from '@angular/core';
import {OrderLineModel} from './order-line.model';

export class OrderModel implements OnInit{

  totalAmount: number;
  deliveryDate: Date;
  depositeAmount: number;
  mountExist:boolean;
  measureDate:Date;
  orderNumber:string;
  userUsername:string;
  tailorOrderLineCount: number;
  orderlines: OrderLineModel[];

  constructor(public id?: number,
              public orderDate?: Date,
              public customer?: CustomerModel,
              public orderStatus?:number
              ){
  };

  ngOnInit(){
    this.customer = new CustomerModel(null);
  }
}
