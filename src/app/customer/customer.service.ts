import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {CustomerModel} from '../models/customer.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

const url = 'https://measure-notebook-api.herokuapp.com/customer/add';
const urlGetAll = 'https://measure-notebook-api.herokuapp.com/customer/list';
const urlUpdate = 'https://measure-notebook-api.herokuapp.com/customer/update';
const urlSearch = 'https://measure-notebook-api.herokuapp.com/customer/search/';
const urlDelete = 'https://measure-notebook-api.herokuapp.com/customer/';

@Injectable()
export class CustomerService {
  constructor(private http: HttpClient) { }

  public add(customerDetailModel: CustomerModel, orderStatus: number): Observable<any> {
    const body = {customerDetailModel, orderStatus};
    return this.http.post(url, body);
  }

  public getAll(event) {
    return this.http.post(urlGetAll, event);
  }

   public deleteById(customerId: number) {
    return this.http.delete(urlDelete + customerId);
  }

  public update(customer: CustomerModel) {
    return this.http.put(urlUpdate, customer);
  }

  public search(text: string) {
   return this.http.get(urlSearch + text)
     .catch((err: Event) => {
       if (event instanceof HttpErrorResponse) {
         return Observable.of({error: {connection: true}});
       }
     });
  }
}
