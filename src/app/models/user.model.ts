export class UserModel{
  public id;
  public token;
  public role;
  public companyName;
  public companyPhone;
  public companyAddress;
  public companyMail;
  public password;

  constructor(public userName?, public surname?,public email?,public phone?){}
}
