import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {ICustomerFormState} from './customerForm.store';
import {Customer} from '../models/customer.model';

@Injectable()
export class CustomerService {

  /*For test application, will delete*/
  customers: Customer[] = [];
  /*---END---*/

  constructor(private http: HttpClient) { }
  public add(customer: Customer) {
   const id = this.customers.length+1;
   customer.id =id;
   this.customers.push(customer);
   return id;
  }
}
