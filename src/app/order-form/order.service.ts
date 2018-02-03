import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {OrderModel} from '../models/order.model';
import {CustomerModel} from '../models/customer.model';

@Injectable()
export class OrderService {
  private readonly url = 'https://measure-notebook-api.herokuapp.com/order/add';
  private header = new HttpHeaders()
    .set('x-auth-token', localStorage.getItem('xAuthToken'));

  constructor(private http: HttpClient) { }

  public add(order: OrderModel){ //it will be only customer
      return this.http.post(this.url, order, {headers: this.header});
  }

}
