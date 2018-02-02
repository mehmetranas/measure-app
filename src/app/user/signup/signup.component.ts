import { Component, OnInit } from '@angular/core';
import {UserModel} from '../../models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public user: UserModel = new UserModel();
  constructor() { }

  ngOnInit() {
  }

  public cancel(){

  }

  public addUser(){

  }

}
