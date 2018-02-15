import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class OrderService {
  private readonly url = 'https://measure-notebook-api.herokuapp.com/order/add';
  private header = new HttpHeaders()
    .set('x-auth-token', localStorage.getItem('xAuthToken'));

  constructor(private http: HttpClient) { }

  public getOrders(){
    return this.http.get(this.url,{headers:this.header});
  }
}
