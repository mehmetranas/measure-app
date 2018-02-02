import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {ICustomerFormState} from './customerForm.store';
import {CustomerModel} from '../models/customer.model';

@Injectable()
export class CustomerService {

  /*For test application, will delete*/
  customers: CustomerModel[] = [];
  /*---END---*/

  constructor(private http: HttpClient) { }
  public add(customer: CustomerModel) {
   const id = this.customers.length+1;
   customer.id =id;
   this.customers.push(customer);
   return id;
  }
}
