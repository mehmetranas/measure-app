import {CustomerModel} from './customer.model';

export class OrderModel {

  totalAmount: number;
  deliveryDate: Date;
  depositeAmount: number;
  mountDate:Date;
  measureDate:Date;

  constructor(public id?: number,
              public orderDate?: Date,
              public customer?: CustomerModel,
              public orderStatus?:number
              ){};
}
