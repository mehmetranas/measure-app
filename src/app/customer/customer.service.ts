import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {CustomerModel} from '../models/customer.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class CustomerService {

  private readonly url = 'https://measure-notebook-api.herokuapp.com/customer/add';
  private header = new HttpHeaders()
    .set('x-auth-token', localStorage.getItem('xAuthToken'));

  constructor(private http: HttpClient) { }

  public add(customerDetailModel: CustomerModel, orderStatus:number): Observable<any> {
    let body = {customerDetailModel,orderStatus};
    return this.http.post(this.url,body,{headers: this.header});
  }

  //for development mode, it is going to delete
  addForDevMode(customer: CustomerModel, isToBeMeasure:number) {
    console.log(isToBeMeasure)
    return Observable.of({customerId: 1, orderDate: new Date(), id:23})
  }
}
