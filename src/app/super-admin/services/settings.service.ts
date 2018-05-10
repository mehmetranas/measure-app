import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SuperModel} from "../models/models";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";

const url = 'http://167.99.81.86:8181';

@Injectable()
export class SettingsService {
  private _user:BehaviorSubject<SuperModel> = new BehaviorSubject<SuperModel>(null);
  public user:Observable<SuperModel> = this._user.asObservable();

  constructor(private http:HttpClient) { }

  public getUser(){
    if(this._user.getValue() == null)
     this.http.get(url + "/admin/active")
      .map((data:any) => this._user.next(data))
       .subscribe();
  }

  public updateMail(user: SuperModel){
    return this.http.put(url +"/user/update",user)
      .map(() => this._user.next(user));
  }

  public updatePassword(currentPassword:string,newPassword:string){
    const encodedData = btoa(currentPassword + ':' + newPassword);
    const basicHeader = 'Basic ' + encodedData;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('update-password', basicHeader);
    return this.http.put(url + "/user/update/password", {}, {headers: headers});
  }

}
