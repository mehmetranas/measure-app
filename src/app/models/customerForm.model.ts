import {CustomerModel} from './customer.model';

export class CustomerFormModel{
  customer:CustomerModel = new CustomerModel(null);
  isToBeMeasured:boolean;
}
