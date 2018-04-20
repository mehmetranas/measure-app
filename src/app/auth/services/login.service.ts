import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/take';
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material";
import {UserModel} from "../../models/user.model";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/do";
import {CompanyModel} from "../../models/company.model";

const firebaseRegUrl = 'https://measure-notebook-api.herokuapp.com/firebase/regId';

@Injectable()
export class AuthService{

  public navigate: Observable<boolean>;
  public user: UserModel = new UserModel();
  public company: CompanyModel = new CompanyModel();
  private readonly url= 'https://measure-notebook-api.herokuapp.com';

  constructor(private http: HttpClient, private router: Router) { }

  public sendCredential(username: string, password: string) {
    let url = this.url + '/token';
    let encodedCredentials = btoa(username + ":" + password);
    let basicHeader = "Basic " + encodedCredentials;
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', basicHeader);
    return this.http.get(url, { headers: headers })
      .map((data:any) => {
        localStorage.setItem('xAuthToken', data.token);
        this.user = data.userDetailModel;
        this.company = data.companyDetailModel;
        return data.userDetailModel.role;
      });
  }

  public checkSession() {
    let url = this.url + "/checkSession";
    return this.http.get(url, {observe:'response'})
      .map((data:any) => {
        this.user.role = data.body.role;
        return data; //should return data because of its status code
      })
      .catch(() => {
        localStorage.clear();
        this.router.navigateByUrl("/auth");
        return of(false);
      })
  }

  public sendRegId(regId: number){
    return this.http.post(this.url + "/firebase/add/regId",{webRegistrationId:regId})
  }

  public logout() {
    let url = this.url + "/user/logout";
    return this.http.post(url,'',{responseType:'text'})
      .map((response) => {
        localStorage.removeItem('xAuthToken');
        this.user = new UserModel();
        return response;
      });
  }
}
