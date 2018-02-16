import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {OrderModel} from '../models/order.model';
import {Observable} from 'rxjs/Observable';
import {observable} from 'rxjs/symbol/observable';

@Injectable()
export class OrderService {
  private readonly url = 'https://measure-notebook-api.herokuapp.com/order/add';
  private header = new HttpHeaders()
    .set('x-auth-token', localStorage.getItem('xAuthToken'));

  constructor(private http: HttpClient) { }

  public getOrders(){
    return this.http.get(this.url,{headers:this.header});
  }

  public postOrder(order: OrderModel): Observable<any>{
    console.log("posted order is ",order);
    return this.http.post(this.url, order,{headers:this.header});
  }
}
