import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {ICustomerFormState} from '../redux/stores/customerForm.store';
import {CustomerModel} from '../models/customer.model';

@Injectable()
export class CustomerService {

  private readonly url = 'https://measure-notebook-api.herokuapp.com/token';
  /*For test application, will delete*/
  customers: CustomerModel[] = [];
  /*---END---*/

  constructor(private http: HttpClient) { }

  public add(customer: CustomerModel) {
    return this.http.post(this.url, customer);
  }
}
