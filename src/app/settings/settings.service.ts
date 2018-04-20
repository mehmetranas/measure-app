import { Injectable } from '@angular/core';
import {UserModel} from "../models/user.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {CompanyModel} from "../models/company.model";

const urlUpdateUser = "https://measure-notebook-api.herokuapp.com/user/update";
const urlUpdateCompany = "https://measure-notebook-api.herokuapp.com/user/update/company";
const urlUpdatePassword = "https://measure-notebook-api.herokuapp.com/user/update/password";

@Injectable()
export class SettingsService {

  constructor(private http: HttpClient) { }

  public changePassword(currentPassword,newPassword){
    let encodedData = btoa(currentPassword + ":" + newPassword);
    let basicHeader = "Basic " + encodedData;
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('update-password', basicHeader);
    return this.http.put(urlUpdatePassword,{},{headers:headers});
  }

  public updateUser(user:UserModel){
    return this.http.put(urlUpdateUser,user);
  }

  public updateCompany(company: CompanyModel) {
    return this.http.put(urlUpdateCompany,company);
  }
}
