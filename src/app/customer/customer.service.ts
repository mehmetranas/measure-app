import { Injectable } from '@angular/core';
import {ICustomerFormState} from './customerForm.store';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CustomerService {

  /*For test application, will delete*/
  customers: ICustomerFormState[] = [];
  /*---END---*/
  constructor(private http: HttpClient ) { }
  public add(customer: ICustomerFormState) {
    this.customers.push(customer);
  }
}
