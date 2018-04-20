export class UserModel{
  public id;
  public token;
  public name;
  public role;
  public companyName;
  public companyPhone;
  public password;
  public imageUrl;

  constructor(public userName?, public surname?,public email?,public phone?){}
}
