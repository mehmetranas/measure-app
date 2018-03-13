import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
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
  // private readonly urlGetOrder = 'http://localhost:3000/orderDetail';
  // private readonly urlGetOrders = 'http://localhost:3000/orders';

  constructor(private http: HttpClient) { }

  public getOrder(id:number): Observable<any>{
    return this.http.get(this.urlGetOrder + id)
      .map((response: any) => {
        let order: OrderModel = new OrderModel();
        order = response.order;
        order.orderlines = [];
        response.orderLineDetailList.forEach((or: OrderLineModel,i) => {
          let orderline: OrderLineModel = new OrderLineModel();
          orderline = or;
          orderline.order = response.order;
          order.orderlines.push(orderline);
        });
        return order;
      })
    // For test
    // return this.http.get(this.urlGetOrder)
  }

  public getOrders(event: LazyLoadEvent){
    return this.http.post(this.urlGetOrders, event);
    // return this.http.get(this.urlGet)
    //   .map((data:any[]) => {
    //     return {
    //       orders:data.slice(event.first,(event.first+event.rows)),
    //       totalRecords:data.length
    //     }
    //   });
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
}
