import {CustomerModel} from './customer.model';
import {OnInit} from '@angular/core';

export class OrderModel implements OnInit{

  totalAmount: number;
  deliveryDate: Date;
  depositeAmount: number;
  mountDate:Date;
  measureDate:Date;
  userName:string;

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
