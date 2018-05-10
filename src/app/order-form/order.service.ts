import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {OrderModel} from '../models/order.model';
import {Observable} from 'rxjs/Observable';
import {LazyLoadEvent} from 'primeng/api';
import {OrderLineModel} from '../models/order-line.model';

const urlPost = 'http://167.99.81.86:8181/order/update';
const urlGetOrders = 'http://167.99.81.86:8181/order/list';
const urlGetOrder = 'http://167.99.81.86:8181/order/';
const urldeleteByOrderId = 'http://167.99.81.86:8181/order/';
const urldeleteByOrderList = 'http://167.99.81.86:8181/order/list';
const urlgetByCustomerId = 'http://167.99.81.86:8181/customer/';
const urlSearchOrder = 'http://167.99.81.86:8181/order/search/'; // +text
const urlFilterOrder = 'http://167.99.81.86:8181/order/list/filter'; // +orders status value

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
    const params = new HttpParams().set('orderNumber',value);
      return this.http.get(urlSearchOrder,{params:params})
      .map((data: any) => data.orders);
  }

  public orderFilter(value, event) {
    const params = new HttpParams().set('status', value);
    return this.http.post(urlFilterOrder, event, {params: params});
  }
}
