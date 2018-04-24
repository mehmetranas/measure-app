import {CompanyModel} from "./company.model";

export class UserModel{
  public role;
  public password;
  public userSign;
  public company:CompanyModel;

  constructor(public id?,public username?,public name?, public surname?,public email?,public phone?){}

}
