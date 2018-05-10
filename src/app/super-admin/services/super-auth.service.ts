import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {catchError, map, take} from "rxjs/operators";
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";
import {Router} from "@angular/router";

const urlLogin = 'http://167.99.81.86:8181/admin/token';
const urlLogout = 'http://167.99.81.86:8181/user/logout';
const urlCheckSuperSession = 'http://167.99.81.86:8181/admin/checkSession';
@Injectable()
export class SuperAuthService {
public isLoad:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
public isLoad$:Observable<boolean> = this.isLoad.asObservable();
public userRole$:BehaviorSubject<string> = new BehaviorSubject<string>(null);
  constructor(private http: HttpClient,private router:Router) { }

  public checkSession(){
    return this.http.get(urlCheckSuperSession, {observe:'response'})
      .pipe(
        take(1),
        map((data:any) => {
          if(!data.body.role || data.body.role !== 'r0') throw new Error();
          this.userRole$.next(data.body.role);
          return data;
        }),
        catchError((err) => {
          localStorage.clear();
          this.router.navigate(['super/auth']);
          return of(false)
        })
      );
  }

  public login(username:string, password:string) {
    const encodedCredentials = btoa(username + ':' + password);
    const basicHeader = 'Basic ' + encodedCredentials;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', basicHeader);
    return this.http.get(urlLogin, { headers: headers})
      .map((data:any) => {
        localStorage.setItem('xAuthToken', data.token);
        localStorage.setItem('isSuper', '1');
        return data.userDetailModel.role;
      });
  }

  public logout() {
    return this.http.post(urlLogout, '', {responseType: 'text'})
      .map((response) => {
        localStorage.clear();
        this.router.navigate(['super/auth']);
        return response;
      });
  }

}
