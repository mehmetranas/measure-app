import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {OrderModel} from '../models/order.model';
import {Observable} from 'rxjs/Observable';
import {LazyLoadEvent} from 'primeng/api';
import {OrderLineModel} from '../models/order-line.model';

const urlPost = 'https://measure-notebook-api.herokuapp.com/order/update';
const urlGetOrders = 'https://measure-notebook-api.herokuapp.com/order/list';
const urlGetOrder = 'https://measure-notebook-api.herokuapp.com/order/';
const urldeleteByOrderId = 'https://measure-notebook-api.herokuapp.com/order/';
const urldeleteByOrderList = 'https://measure-notebook-api.herokuapp.com/order/list';
const urlgetByCustomerId = 'https://measure-notebook-api.herokuapp.com/customer/';
const urlSearchOrder = 'https://measure-notebook-api.herokuapp.com/order/search/'; // +text
const urlFilterOrder = 'https://measure-notebook-api.herokuapp.com/order/list/filter'; // +orders status value

@Injectable()
export class OrderService {
  @Output() ordersUpdated: EventEmitter<OrderModel[]> = new EventEmitter<OrderModel[]>();

  constructor(private http: HttpClient) { }

  public getOrder(id: number): Observable<any> {
    return this.http.get(urlGetOrder + id)
      .map((response: any) => {
        <OrderLineModel[]>response.orderLineDetailList.forEach((orderline) => orderline.order = response.order);
        return response;
      });
  }

  public getOrdersByCustomerId(id: number) {
    return this.http.get(urlgetByCustomerId + id + '/orders')
      .map((response: any) => {
        if (response && response.orders) {
          return response.orders;
        } else { return Observable.of([]); }
      });
  }

  public getOrders(event: LazyLoadEvent) {
    return this.http.post(urlGetOrders, event);
  }

  public update(order: OrderModel): Observable<any> {
    return this.http.put(urlPost, order);
  }

  public deleteById(id: number) {
    return this.http.delete(urldeleteByOrderId + id);
  }

  public deleteByList(idList: number[]) {
    return this.http.request('delete', urldeleteByOrderList, {body: {orderIds: idList}});
  }

  public searchOrder(value: string) {
      return this.http.get(urlSearchOrder + value)
      .map((data: any) => data.orders);
  }

  public orderFilter(value, event) {
    const params = new HttpParams().set('status', value);
    return this.http.post(urlFilterOrder, event, {params: params});
  }
}
