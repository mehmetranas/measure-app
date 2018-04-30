import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TenantModel} from "../models/tenant.model";

const urlGetTenants = 'https://measure-notebook-api.herokuapp.com/admin/company/list';

@Injectable()
export class TenantService {
  public tenantForDetail:TenantModel;
  constructor(private http:HttpClient) { }

  public tenants(){
    return this.http.get(urlGetTenants)
      .map((data:any) => data.companies);
  }

}
