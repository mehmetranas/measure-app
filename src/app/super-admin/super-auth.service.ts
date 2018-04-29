import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

const urlLogin = 'https://measure-notebook-api.herokuapp.com/admin/token';
@Injectable()
export class SuperAuthService {

  constructor(private http: HttpClient) { }

  public login(username:string, password:string) {
    const encodedCredentials = btoa(username + ':' + password);
    const basicHeader = 'Basic ' + encodedCredentials;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', basicHeader);
    return this.http.get(urlLogin, { headers: headers})
      .map((data:any) => {
        localStorage.setItem('xAuthToken', data.token);
        return data.userDetailModel.role;
      });
  }
}
