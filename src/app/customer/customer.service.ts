import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {ICustomerFormState} from '../redux/stores/customerForm.store';
import {CustomerModel} from '../models/customer.model';
import {OrderModel} from '../models/order.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class CustomerService {

  private readonly url = 'https://measure-notebook-api.herokuapp.com/customer/add';
  private header = new HttpHeaders()
    .set('x-auth-token', localStorage.getItem('xAuthToken'));

  constructor(private http: HttpClient) { }

  public add(customer: CustomerModel): Observable<any> {
    return this.http.post(this.url, customer  , {headers: this.header});
  }

  //for development mode, it is going to delete
  addForDevMode(customer: CustomerModel) {
    return Observable.of({customerId: 1, orderDate: new Date(), id:23})
  }
}
