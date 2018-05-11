import { Injectable } from '@angular/core';
import {UserModel} from '../models/user.model';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {CompanyModel} from '../models/company.model';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {map, take} from "rxjs/operators";
import "rxjs/add/observable/of";
import {TenantModel} from "../super-admin/models/models";

const urlUpdateUser = 'https://167.99.81.86:8181/user/update';
const urlUpdateCompany = 'https://167.99.81.86:8181/company/update';
const urlUpdatePassword = 'https://167.99.81.86:8181/user/update/password';
const urlGetTenantUsers = 'https://167.99.81.86:8181/company/users';
const urlUserDelete = 'https://167.99.81.86:8181/user/delete';
const urlRegisterUser = 'https://167.99.81.86:8181/user/register';

@Injectable()
export class SettingsService {
  private usersCloned:UserModel[];
  private users: BehaviorSubject<UserModel[]> = new BehaviorSubject<UserModel[]>(null);
  public users$ = this.users.asObservable();

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
        // update role
        if(user.role === 2) user.role = 'r2';
        else if(user.role === 3) user.role = 'r3';
         user.id = data.data;
         this.usersCloned.push(user);
         this.users.next(this.usersCloned);
      });
}

  public updateUser(user: UserModel) {
    return this.http.put(urlUpdateUser, user);
  }

  public updateCompany(company: TenantModel) {
    return this.http.put(urlUpdateCompany, company);
  }

  public deleteUser(userId:number){
    const params = new HttpParams().set("userId",userId.toString());
    return this.http.delete(urlUserDelete,{params:params})
      .map(() => {
        const index = this.usersCloned.findIndex((user:UserModel) => user.id === userId);
        if(index > -1) {
          this.usersCloned.splice(index,1);
          this.users.next(this.usersCloned);
        }
      });
  }

  public getTenantUsers() {
    return this.http.get(urlGetTenantUsers)
      .pipe(
        take(1),
        map((data:any) => {
          this.usersCloned = data.users || [];
          this.users.next(this.usersCloned);
        })
      );
  }
}
