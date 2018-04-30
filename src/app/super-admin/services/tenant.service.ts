import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TenantModel} from "../models/tenant.model";
import {Observable} from "rxjs/Observable";

const urlGetTenants = 'https://measure-notebook-api.herokuapp.com/admin/company/list';
const urlGetTenantBlock = 'https://measure-notebook-api.herokuapp.com/admin/company/block';
const urlGetTenantDelete = 'https://measure-notebook-api.herokuapp.com/admin/company/block';

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

  public deleteUser(id: number) {

  }

  public removeBlock(id: number) {
    return Observable.of(null)
  }
}
