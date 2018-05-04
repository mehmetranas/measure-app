export class UserModel {
  public password: string;
  public userSign;
  public companyDetailModel:{id:number} = {id:null};
  public enabled: boolean;

  constructor(public role?: number | string,
              public id?: number,
              public nameSurname?: string,
              public email?: string,
              public phone?: string) {}

}
