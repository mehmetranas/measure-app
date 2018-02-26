import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {OrderModel} from '../models/order.model';
import {Observable} from 'rxjs/Observable';
import {LazyLoadEvent} from 'primeng/api';

@Injectable()
export class OrderService {
  private readonly urlPost = 'https://measure-notebook-api.herokuapp.com/order/update';
  private readonly urlGetOrders = 'https://measure-notebook-api.herokuapp.com/order/list';
  private readonly urlGetOrder = 'https://measure-notebook-api.herokuapp.com/order/';
  // private readonly urlGetOrder = 'http://localhost:3000/orderDetail';
  // private readonly urlGetOrders = 'http://localhost:3000/orders';
  private header = new HttpHeaders()
    .set('x-auth-token', localStorage.getItem('xAuthToken'));

  constructor(private http: HttpClient) { }

  public getOrder(id:number): Observable<any>{
    return this.http.get(this.urlGetOrder + id,{headers:this.header})
    // For test
    // return this.http.get(this.urlGetOrder)
  }

  public getOrders(event: LazyLoadEvent){
    return this.http.post(this.urlGetOrders, event,{headers:this.header});
    // return this.http.get(this.urlGet)
    //   .map((data:any[]) => {
    //     return {
    //       orders:data.slice(event.first,(event.first+event.rows)),
    //       totalRecords:data.length
    //     }
    //   });
  }

  public update(order: OrderModel): Observable<any>{
    console.log("posted order is ",order);
    return this.http.put(this.urlPost, order,{headers:this.header});
  }
}
