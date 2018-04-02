import { Injectable } from '@angular/core';
import {UserModel} from "../../models/user.model";
import {AuthService} from "./login.service";

@Injectable()
export class UserService {
  public user: UserModel = new UserModel();

  constructor(private authService:AuthService) {
    this.authService.checkSession()
      .take(1)
      .subscribe((response:any) => {
        this.user = response.body;
        console.log(this.user);
      });
  }

}
