import { Injectable } from '@angular/core';
import {OrderLineModel} from '../models/order-line.model';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class OrderlineService {

  private readonly urlAddList = 'https://measure-notebook-api.herokuapp.com/order/line/list/add';
  private readonly addUrl = 'https://measure-notebook-api.herokuapp.com/order/line/add';
  private readonly urlDeleteById = 'https://measure-notebook-api.herokuapp.com/order/line/';
  private readonly calculateOrderlineUrl = 'https://measure-notebook-api.herokuapp.com/order/line/calculate';
  private readonly getUrl = 'http://localhost:3000/orderlines';

  constructor(private http: HttpClient) { }

  public add(orderline: OrderLineModel): Observable<any> {
    return this.http.post(this.addUrl, orderline).map((response: any) => {
      return {
        order: {
          totalAmount: response.orderTotalAmount
        },
        lineAmount: response.lineAmount,
        id: response.id
      };
    });
  }

  public getTestOrdeline(){
    this.http.get(this.getUrl).take(1);
  }

  public calculate(orderlines: OrderLineModel[]){
    return this.http
      .post(this.calculateOrderlineUrl,{orderLineDetailModelList:orderlines});
  }

  public deleteById(id: number){
    return this.http.delete(this.urlDeleteById + id);
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

  public addList(orderlines: OrderLineModel[]) {
    return this.http.post(this.urlAddList,{orderLineDetailModelList:orderlines});
  }
}

