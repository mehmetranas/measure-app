import {UserModel} from "../../models/user.model";

export interface TenantModel {
  id: number,
  tenantName: string,
  phone: string,
  address: string,
  email: string,
  tenantCode: string,
  tenantUserCount: number,
  enabled: boolean,
  users: UserModel[]
}

export class TenantModel implements TenantModel{
  users: UserModel[] = [];
  enabled: boolean = true;
  tenantUserCount: number = 0;
}

export class SuperModel {
  id:number;
  email:string;
  password:string;
}
