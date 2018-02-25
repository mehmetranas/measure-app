import { Injectable } from '@angular/core';
import {OrderLineModel} from '../models/order-line.model';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class OrderlineService {

  private readonly url = 'https://measure-notebook-api.herokuapp.com/order/line/add';
  private readonly getUrl = 'http://localhost:3000/orderlines';
  private header = new HttpHeaders()
    .set('x-auth-token', localStorage.getItem('xAuthToken'));

  constructor(private http: HttpClient) { }

  public add(orderlineInProcess: OrderLineModel): Observable<any> {
    return this.http.post(this.url, orderlineInProcess, {headers: this.header}).map((response: any) => {
        const prepareResponse = {
          order:{
            totalAmount:response.orderTotalAmount
          },
          lineAmount: response.lineAmount,
          id:response.id
        };
      return prepareResponse;
    });
  }

  public getTestOrdeline(){
    this.http.get(this.getUrl).take(1);
  }

  public addToTest(orderlineInProcess: OrderLineModel): Observable<any>{
    return Observable.of({id:5, lineAmount:500, orderTotalAmount:1500}).map((response: any) => {
      const prepareResponse = {
        order:{
          totalAmount:response.orderTotalAmount
        },
        lineAmount: response.lineAmount,
        id:response.id
      };
      return prepareResponse;
    });
  }
}

