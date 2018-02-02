import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class AuthService {

  private readonly url= 'https://measure-notebook-api.herokuapp.com';

  constructor(private http: HttpClient) { }

  public sendCredential(username: string, password: string) {
    let url = this.url + '/token';
    let encodedCredentials = btoa(username + ":" + password);
    let basicHeader = "Basic " + encodedCredentials;
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', basicHeader);

    return this.http.get(url, { headers: headers });
  }

  public checkSession() {
    let url = this.url + "/checkSession";

    let headers = new HttpHeaders ({
      'x-auth-token':localStorage.getItem('xAuthToken')
    });

    return this.http.get(url, {headers: headers});

  }

  public logout() {
    let url = this.url + "/user/logout";

    let headers = new HttpHeaders ({
      'x-auth-token':localStorage.getItem('xAuthToken')
    });

    return this.http.post(url,'', {headers: headers});
  }
}
