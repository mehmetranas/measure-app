import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';

import {CustomerModel} from '../models/customer.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

const url = 'https://167.99.81.86:8181/customer/add';
const urlGetAll = 'https://167.99.81.86:8181/customer/list';
const urlUpdate = 'https://167.99.81.86:8181/customer/update';
const urlSearch = 'https://167.99.81.86:8181/customer/search/';
const urlDelete = 'https://167.99.81.86:8181/customer/';

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
    const params = new HttpParams().set('text',text);
   return this.http.get(urlSearch,{params:params})
     .catch((err: Event) => {
       if (event instanceof HttpErrorResponse) {
         return Observable.of({error: {connection: true}});
       }
     });
  }
}
