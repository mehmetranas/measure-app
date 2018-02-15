import { Injectable } from '@angular/core';
import {OrderLineModel} from '../models/order-line.model';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class OrderlineService {

  private readonly url = 'https://measure-notebook-api.herokuapp.com/order/line/add';
  private header = new HttpHeaders()
    .set('x-auth-token', localStorage.getItem('xAuthToken'));

  constructor(private http: HttpClient) { }

  public add(orderlineInProcess: OrderLineModel): Observable<any> {
  //   return this.http.post(this.url, orderlineInProcess, {headers: this.header}).map((response: any) => {
  //       const prepareResponse = {
  //         order:{
  //           orderTotalAmount:response.orderTotalAmount
  //         },
  //         lineAmount: response.lineAmount,
  //         id:response.id
  //       };
  //     return prepareResponse;
  //});
    return Observable.of({id:5, lineAmount:500, orderTotalAmount:1500}).map((response: any) => {
      const prepareResponse = {
        order:{
          orderTotalAmount:response.orderTotalAmount
        },
        lineAmount: response.lineAmount,
        id:response.id
      };
      return prepareResponse;
    });
  }
}
