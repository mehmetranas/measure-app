import {CustomerModel} from './customer.model';

export class OrderModel {
  public customer: CustomerModel
  public orderStatus: number;
}
