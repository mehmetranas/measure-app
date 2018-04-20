import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {OrderModel} from '../models/order.model';
import {Observable} from 'rxjs/Observable';
import {LazyLoadEvent} from 'primeng/api';
import {OrderLineModel} from '../models/order-line.model';

@Injectable()
export class OrderService {
  private readonly urlPost = 'https://measure-notebook-api.herokuapp.com/order/update';
  private readonly urlGetOrders = 'https://measure-notebook-api.herokuapp.com/order/list';
  private readonly urlGetOrder = 'https://measure-notebook-api.herokuapp.com/order/';
  private readonly urldeleteByOrderId = 'https://measure-notebook-api.herokuapp.com/order/';
  private readonly urldeleteByOrderList = 'https://measure-notebook-api.herokuapp.com/order/list';
  private readonly urlgetByCustomerId = 'https://measure-notebook-api.herokuapp.com/customer/';
  private readonly urlSearchOrder = 'https://measure-notebook-api.herokuapp.com/order/search/'; // +text
  @Output() ordersUpdated: EventEmitter<OrderModel[]> = new EventEmitter<OrderModel[]>();

  constructor(private http: HttpClient) { }

  public getOrder(id:number): Observable<any>{
    return this.http.get(this.urlGetOrder + id)
      .map((response: any) => {
        <OrderLineModel[]>response.orderLineDetailList.forEach((orderline,i) => orderline.order = response.order);
        return response;
      })
  }

  public getOrdersByCustomerId(id: number){
    return this.http.get(this.urlgetByCustomerId + id + "/orders")
      .map((response:any) => {
        if(response && response.orders)
          return response.orders;
        else return Observable.of([]);
      });
  }

  public getOrders(event: LazyLoadEvent){
    return this.http.post(this.urlGetOrders, event)
      .catch((err: Event) => {
        if(event instanceof HttpErrorResponse){
          return Observable.of({error:{connection:true}})
        }
      });
  }

  public update(order: OrderModel): Observable<any>{
    return this.http.put(this.urlPost, order);
  }

  public deleteById(id:number){
    return this.http.delete(this.urldeleteByOrderId + id);
  }

  public deleteByList(idList: number[]){
    return this.http.request('delete',this.urldeleteByOrderList, {body:{orderIds:idList}});
  }

  public searchOrder(value:string){
    return this.http.get(this.urlSearchOrder + value)
      .map((data: any) => data.orders);
  }
}
