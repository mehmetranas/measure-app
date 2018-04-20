import { Injectable } from '@angular/core';
import {UserModel} from "../models/user.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

const urlUpdateUser = "https://measure-notebook-api.herokuapp.com/user/update";
const urlUpdatePassword = "https://measure-notebook-api.herokuapp.com/user/update/password";

@Injectable()
export class SettingsService {

  constructor(private http: HttpClient) { }

  public changePassword(currentPassword,newPassword){
    let encodedData = btoa(currentPassword + ":" + newPassword);
    let basicHeader = "Basic " + encodedData;
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('update-password', basicHeader);
    return this.http.put(urlUpdatePassword,{},{headers:headers})
      .catch((err:any) => {
        let error: {
          formValidationError:{
            message:string,
          }
        };
        if(err.oldPasswordWrong)
          error.formValidationError.message = "Şifre yanlış";
        if(err.newPasswordMustBeMinSix)
          error.formValidationError.message = "Şifre uzunluğu 6'dan küçük 10'dan büyük olamaz";
        return Observable.of(error)
      });
  }

  public updateUser(user:UserModel){
    return this.http.put(urlUpdateUser,user);
  }
}

const res = {
  "oldPasswordEmpty": false,
  "newPasswordEmpty": false,
  "oldPasswordWrong": false,
  "newPasswordMustBeMinSix": false,
  "newPasswodMustBeMaxTen": false,
  "badRequest": false,
  "userNotFound": false
}
