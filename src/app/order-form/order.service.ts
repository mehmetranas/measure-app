import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {OrderModel} from '../models/order.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class OrderService {
  private readonly urlPost = 'https://measure-notebook-api.herokuapp.com/order/add';
  // private readonly urlGet = 'https://measure-notebook-api.herokuapp.com/order/list';
  private readonly urlGet = 'http://localhost:3000/orders';
  private header = new HttpHeaders()
    .set('x-auth-token', localStorage.getItem('xAuthToken'));

  constructor(private http: HttpClient) { }

  public getOrders(){
    // return this.http.get(this.urlGet,{headers:this.header});
    return this.http.get(this.urlGet);
  }

  public postOrder(order: OrderModel): Observable<any>{
    console.log("posted order is ",order);
    return this.http.post(this.urlPost, order,{headers:this.header});
  }
}
