import { Injectable } from '@angular/core';
import {OrderLineModel} from '../models/order-line.model';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class OrderlineService {

  private readonly urlAddList = 'https://measure-notebook-api.herokuapp.com/orderLine/list/add';
  private readonly addUrl = 'https://measure-notebook-api.herokuapp.com/orderLine/add';
  private readonly urlDeleteById = 'https://measure-notebook-api.herokuapp.com/orderLine/';
  private readonly calculateOrderlineUrl = 'https://measure-notebook-api.herokuapp.com/orderLine/calculate';

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

  public calculate(orderlines: OrderLineModel[]){
    return this.http
      .post(this.calculateOrderlineUrl,{orderLineDetailModelList:orderlines});
  }

  public deleteById(id: number){
    return this.http.delete(this.urlDeleteById + id);
  }

  public addList(orderlines: OrderLineModel[]) {
    return this.http.post(this.urlAddList,{orderLineDetailModelList:orderlines});
  }
}

