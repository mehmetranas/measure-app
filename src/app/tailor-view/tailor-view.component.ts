import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {AuthService} from "../user/services/login.service";
import {Router} from "@angular/router";
import {UserModel} from "../models/user.model";
import {MessagingService} from "../messaging.service";

@Component({
  selector: 'app-tailor-view',
  templateUrl: './tailor-view.component.html',
  styleUrls: ['./tailor-view.component.css']
})
export class TailorViewComponent implements OnInit {

  public user:UserModel = new UserModel();
  public message;
  public subscription = new Subscription();
  constructor(private authService: AuthService, private router: Router, private msgService:MessagingService) { }

  ngOnInit() {
    this.user = this.authService.user;
    this.msgService.getPermission();
    this.msgService.receiveMessage();
    this.message = this.msgService.currentMessage;
  }

  public ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  public isLogged() {
    return localStorage.getItem('xAuthToken') == null;
  }

  public logout( ){
    this.subscription = this.authService.logout().subscribe(() => {
      this.router.navigate(['login']);
      console.log('Logout is successfully.');
    });
  }

}
