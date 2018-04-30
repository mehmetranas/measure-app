import {Injectable, } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/take';
import {Router} from '@angular/router';
import {UserModel} from '../../models/user.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {CompanyModel} from '../../models/company.model';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {

  public navigate: Observable<boolean>;
  public user$: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(null);
  public userRole$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public company$: BehaviorSubject<CompanyModel> = new BehaviorSubject<CompanyModel>(null);

  private readonly url = 'https://measure-notebook-api.herokuapp.com';

  constructor(private http: HttpClient, private router: Router) { }

  public sendCredential(username: string, password: string) {
    const url = this.url + '/token';
    const encodedCredentials = btoa(username + ':' + password);
    const basicHeader = 'Basic ' + encodedCredentials;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', basicHeader);
    return this.http.get(url, { headers: headers})
      .map((data: any) => {
        localStorage.setItem('xAuthToken', data.token);
        this.user$.next(data.userDetailModel);
        this.userRole$.next(data.userDetailModel.role); // User role separate other because of getUser Method
        this.company$.next(data.companyDetailModel);
        return data.userDetailModel.role;
      });
  }

  public checkSession() {
    const url = this.url + '/checkSession';
    return this.http.get(url, {observe: 'response'})
      .map((data: any) => {
        this.userRole$.next(data.body.role);
        return data; //should return data because of its status code
      })
      .take(1)
      .catch(() => {
        localStorage.clear();
        this.router.navigateByUrl('/auth');
        return of(false);
      });
  }

  public getUser() {
    return this.http.get(this.url + '/user/active')
      .map((data: any) => {
        this.user$.next(data.userDetailModel);
        this.userRole$.next(data.userDetailModel.role);
        this.company$.next(data.companyDetailModel);
        return {user: data.userDetailModel, userRole: data.userDetailModel.role, company: data.companyDetailModel};
      });
  }

  public sendRegId(regId: number) {
    return this.http.post(this.url + '/firebase/add/regId', {webRegistrationId: regId});
  }

  public logout() {
    const url = this.url + '/user/logout';
    return this.http.post(url, '', {responseType: 'text'})
      .map((response) => {
        localStorage.clear();
        this.user$.next(null);
        this.userRole$.next(null);
        this.company$.next(null);
        return response;
      });
  }
}
