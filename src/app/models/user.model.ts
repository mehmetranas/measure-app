export class UserModel{
  public password:string;
  public userSign;

  constructor(public role?:number | string,public id?:number,public username?:string,public nameSurname?:string,public email?:string,public phone?:string){}

}
