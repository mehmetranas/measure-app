import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {CustomerModel} from '../models/customer.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class CustomerService {

  private readonly url = 'https://measure-notebook-api.herokuapp.com/customer/add';
  private readonly urlGetAll = 'https://measure-notebook-api.herokuapp.com/customer/list';
  // private readonly urlDeleteById = 'https://measure-notebook-api.herokuapp.com/customer/list';

  constructor(private http: HttpClient) { }

  public add(customerDetailModel: CustomerModel, orderStatus:number): Observable<any> {
    let body = {customerDetailModel,orderStatus};
    return this.http.post(this.url,body);
  }

  public getAll(event){
    return this.http.post(this.urlGetAll,event);
  }

  //for development mode, it is going to delete
  addForDevMode(customer: CustomerModel, isToBeMeasure:number) {
    return Observable.of({customerId: 1, orderDate: new Date(), id:23})
  }

   public deleteById(customerId: number) {
    return Observable.of(true);
  }

  public update(customer: CustomerModel) {
    return Observable.of(true);
  }
}
