import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/take';
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material";

@Injectable()
export class AuthService {

  public redirectUrl: string;
  private readonly url= 'https://measure-notebook-api.herokuapp.com';

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) { }

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
    return this.http.get(url, {observe:'response'})
      .catch(() => {
        localStorage.clear();
        this.snackBar.open("Oturumunuz geçersiz, lütfen tekrar giriş yapınız",null,{duration:2500});
        this.router.navigateByUrl("/dashboard");
        return of(false);
      })
  }

  public logout() {
    let url = this.url + "/user/logout";
    return this.http.post(url,'',{responseType:'text'})
      .map((response) => {
        localStorage.removeItem('xAuthToken');
        localStorage.removeItem('role');
        return response;
      });
  }
}
