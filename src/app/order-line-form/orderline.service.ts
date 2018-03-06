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
  private readonly getUrl = 'http://localhost:3000/orderlines';

  constructor(private http: HttpClient) { }

  public add(orderline: OrderLineModel): Observable<any> {
    return this.http.post(this.addUrl, orderline).map((response: any) => {
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

