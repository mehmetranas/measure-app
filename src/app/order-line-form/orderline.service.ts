import { Injectable } from '@angular/core';
import {OrderLineModel} from '../models/order-line.model';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable()
export class OrderlineService {

  private readonly url = 'https://measure-notebook-api.herokuapp.com/order/line/add';
  private header = new HttpHeaders()
    .set('x-auth-token', localStorage.getItem('xAuthToken'));

  constructor(private http: HttpClient) { }

  public add(orderline: OrderLineModel): Observable<any> {
    console.log(orderline);
    // return this.http.post(this.url, orderline, {headers: this.header});
    return Observable.of({id:5, lineAmount:500, totalAmount:1500});
  }
}
