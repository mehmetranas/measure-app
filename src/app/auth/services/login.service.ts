import {Injectable,} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/take';
import {Router} from "@angular/router";
import {UserModel} from "../../models/user.model";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/do";
import {CompanyModel} from "../../models/company.model";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class AuthService{

  public navigate: Observable<boolean>;
  public user$: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(null);
  public company$: BehaviorSubject<CompanyModel> = new BehaviorSubject<CompanyModel>(null);
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
        this.user$.next(data.userDetailModel);
        this.company$.next(data.companyDetailModel);
        return data.userDetailModel.role;
      });
  }

  public checkSession() {
    let url = this.url + "/checkSession";
    return this.http.get(url, {observe:'response'})
      .map((data:any) => {
        let currentUser: UserModel = this.user$.getValue();
        currentUser.role = data.role;
        this.user$.next(currentUser);
        return data; //should return data because of its status code
      })
      .take(1)
      .catch(() => {
        localStorage.clear();
        this.router.navigateByUrl("/auth");
        return of(false);
      })
  }

  public getUser(){
    if(this.user$.getValue() === null || this.company$.getValue() === null)
    return this.http.get(this.url + "/user/active")
      .map((data:any) => {
        this.user$.next(data.userDetailModel);
        this.company$.next(data.companyDetailModel);
        return {user:data.userDetailMdoel,company:data.companyDetailModel}
      });
    else return Observable.of({user:this.user$.getValue(),company:this.company$.getValue()})
  }

  public sendRegId(regId: number){
    return this.http.post(this.url + "/firebase/add/regId",{webRegistrationId:regId})
  }

  public logout() {
    let url = this.url + "/user/logout";
    return this.http.post(url,'',{responseType:'text'})
      .map((response) => {
        localStorage.removeItem('xAuthToken');
        this.user$.next(null);
        this.company$.next(null);
        return response;
      });
  }
}
