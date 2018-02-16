import {CustomerModel} from './customer.model';

export class OrderModel {
  orderStatus: number;
  totalAmount: number;
  deliveryDate: Date;
  depositeAmount: number;
  mountDate:Date;
  measureDate:Date;

  constructor(public id?: number,
              public orderDate?: Date,
              public customer?: CustomerModel,
              public customerId?: number
              ){};
}
