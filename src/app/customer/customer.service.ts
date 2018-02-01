import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {ICustomerFormState} from './customerForm.store';

@Injectable()
export class CustomerService {

  /*For test application, will delete*/
  customers: ICustomerFormState[] = [];
  /*---END---*/

  constructor(private http: HttpClient) { }
  public add(customer: ICustomerFormState) {
    this.customers.push(customer);
  }
}
