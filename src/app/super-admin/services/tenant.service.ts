import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {TenantModel} from "../models/models";
import {Observable} from "rxjs/Observable";
import {UserModel} from "../../models/user.model";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

const urlGetTenants = 'https://167.99.81.86:8181/admin/company/list';
const urlGetTenantBlock = 'https://167.99.81.86:8181/admin/company/block';
const urlGetTenantRemoveBlock = 'https://167.99.81.86:8181/admin/company/unblock';
const urlAddTenant = 'https://167.99.81.86:8181/admin/company/add';
const urlUserDelete = 'https://167.99.81.86:8181/user/delete';
const urlRegisterAdmin = 'https://167.99.81.86:8181/admin/user/add';

@Injectable()
export class TenantService {
  public tenantsForDetail$:BehaviorSubject<TenantModel[]> = new BehaviorSubject<TenantModel[]>(null);
  public tenants$:BehaviorSubject<TenantModel[]> = new BehaviorSubject<TenantModel[]>(null);
  constructor(private http:HttpClient) { }

  public tenants(){
    if(this.tenants$.getValue()) return this.tenants$;
    return this.http.get(urlGetTenants)
      .map((data:any) => data.companies);
  }

  public block(id: number) {
    return this.http.post(urlGetTenantBlock,{id:id});
  }

  public removeBlock(id: number) {
    return this.http.post(urlGetTenantRemoveBlock,{id:id});
  }

  public deleteUser(userId:number){
    const params = new HttpParams().set("userId",userId.toString());
    return this.http.delete(urlUserDelete,{params:params});
  }

  public registerAdmin(adminUser: UserModel) {
    return this.http.post(urlRegisterAdmin,adminUser)
      .map((data:any) => data.data || null);
  }

  public addTenant(tenant: TenantModel) {
    return this.http.post(urlAddTenant,tenant).
      map((data:any) => data.data || null);
  }

  public updateTenant(tenantCloned: TenantModel) {
    return Observable.of(null)
  }
}
