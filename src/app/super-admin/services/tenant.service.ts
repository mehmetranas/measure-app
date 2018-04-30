import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {TenantModel} from "../models/tenant.model";
import {Observable} from "rxjs/Observable";
import {UserModel} from "../../models/user.model";

const urlGetTenants = 'https://measure-notebook-api.herokuapp.com/admin/company/list';
const urlGetTenantBlock = 'https://measure-notebook-api.herokuapp.com/admin/company/block';
const urlUserDelete = 'https://measure-notebook-api.herokuapp.com/user/delete';
const urlRegisterAdmin = 'https://measure-notebook-api.herokuapp.com/admin/user/add';

@Injectable()
export class TenantService {
  public tenantForDetail:TenantModel;
  constructor(private http:HttpClient) { }

  public tenants(){
    return this.http.get(urlGetTenants)
      .map((data:any) => data.companies);
  }

  public block(id: number) {
    return this.http.post(urlGetTenantBlock,{id:id});
  }

  public removeBlock(id: number) {
    return Observable.of(null)
  }

  public deleteUser(userId:number){
    const params = new HttpParams().set("userId",userId.toString());
    return this.http.delete(urlUserDelete,{params:params});
  }

  public registerAdmin(adminUser: UserModel) {
    return this.http.post(urlRegisterAdmin,adminUser)
      .map((data:any) => data.id || null);
  }
}
