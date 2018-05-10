import { Injectable } from '@angular/core';
import {OrderLineModel} from '../models/order-line.model';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class OrderlineService {

  private readonly urlAddList = 'http://167.99.81.86:8181/orderLine/list/add';
  private readonly addUrl = 'http://167.99.81.86:8181/orderLine/add';
  private readonly urlDeleteById = 'http://167.99.81.86:8181/orderLine/';
  private readonly calculateOrderlineUrl = 'http://167.99.81.86:8181/orderLine/calculate';

  constructor(private http: HttpClient) { }

  public add(orderline: OrderLineModel): Observable<any> {
    return this.http.post(this.addUrl, orderline)
      .map((response: any) => {
      return {
        order: {
          totalAmount: response.orderTotalAmount
        },
        lineAmount: response.lineAmount,
        id: response.id
      };
    });
  }

  public calculate(orderlines: OrderLineModel[]) {
    return this.http
      .post(this.calculateOrderlineUrl, {orderLineDetailModelList: orderlines});
  }

  public deleteById(id: number) {
    return this.http.delete(this.urlDeleteById + id);
  }

  public addList(orderlines: OrderLineModel[]) {
    return this.http.post(this.urlAddList, {orderLineDetailModelList: orderlines});
  }
}

