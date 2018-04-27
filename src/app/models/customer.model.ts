export class CustomerModel {
  public nameSurname;
  public mobilePhone;
  public fixedPhone;
  public address;
  public newsletterAccepted = false;
  constructor(public id: number) {}
}
