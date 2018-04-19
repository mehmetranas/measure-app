import { Injectable } from '@angular/core';
import {observable} from "rxjs/symbol/observable";
import {Observable} from "rxjs/Observable";

@Injectable()
export class SettingsService {

  constructor() { }

  public changePassword(currentPassword,newPassword){
    return Observable.of(true)
  }

  public updateUser(){
    return Observable.of(true)
  }
}
