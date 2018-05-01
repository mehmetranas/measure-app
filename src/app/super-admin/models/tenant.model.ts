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

}
