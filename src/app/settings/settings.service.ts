import { Injectable } from '@angular/core';
import {UserModel} from '../models/user.model';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {CompanyModel} from '../models/company.model';
import {Observable} from "rxjs/Observable";

const urlUpdateUser = 'https://measure-notebook-api.herokuapp.com/user/update';
const urlUpdateCompany = 'https://measure-notebook-api.herokuapp.com/company/update';
const urlUpdatePassword = 'https://measure-notebook-api.herokuapp.com/user/update/password';
const urlGetTenantUsers = 'https://measure-notebook-api.herokuapp.com/company/users';
const urlUserDelete = 'https://measure-notebook-api.herokuapp.com/user/delete';
const urlRegisterUser = 'https://measure-notebook-api.herokuapp.com/user/register';

@Injectable()
export class SettingsService {

  constructor(private http: HttpClient) { }

  public changePassword(currentPassword, newPassword) {
    const encodedData = btoa(currentPassword + ':' + newPassword);
    const basicHeader = 'Basic ' + encodedData;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('update-password', basicHeader);
    return this.http.put(urlUpdatePassword, {}, {headers: headers});
  }

  public registerUser(user: UserModel) {
    return this.http.post(urlRegisterUser, user)
      .map((data:any) => {
        if(data.data && !isNaN(data.data))
          return data.data;
        throw new Error('Hata oluştu')
      });
}

  public updateUser(user: UserModel) {
    return this.http.put(urlUpdateUser, user);
  }

  public updateCompany(company: CompanyModel) {
    return this.http.put(urlUpdateCompany, company);
  }

  public deleteUser(userId:number){
    const params = new HttpParams().set("userId",userId.toString());
    return this.http.delete(urlUserDelete,{params:params});
  }

  public getTenantUsers() {
    return this.http.get(urlGetTenantUsers)
      .map((data: any) => data.users || []);
  }
}
