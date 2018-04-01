import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {AuthService} from "../user/services/login.service";
import {Router} from "@angular/router";
import {UserModel} from "../models/user.model";
import {MessagingService} from "../messaging.service";
import {MessageModel} from "../models/message.model";

@Component({
  selector: 'app-tailor-view',
  templateUrl: './tailor-view.component.html',
  styleUrls: ['./tailor-view.component.css']
})
export class TailorViewComponent implements OnInit {

  public user:UserModel = new UserModel();
  public messages: MessageModel[] = [];
  public subscription = new Subscription();
  private mediaMatcher: MediaQueryList = matchMedia(`(max-width:${720}px)`);
  constructor(private authService: AuthService, private router: Router, private msgService:MessagingService) { }

  ngOnInit() {
    this.user = this.authService.user;
    this.subscription = this.msgService.startFCM()
      .subscribe((msg: any) => {
      console.log(msg);
      if(msg){
        let message = new MessageModel(msg.data.body,msg.data.orderId,msg.data.title);
        this.messages.push(message);
      }
    })
  }

  get isScreenSmall(): boolean{
    return this.mediaMatcher.matches;
  }

  public ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  public isLogged() {
    return localStorage.getItem('xAuthToken') == null;
  }

  public logout( ){
    this.subscription = this.authService.logout().subscribe(() => {
      this.router.navigate(['auth']);
      console.log('Logout is successfully.');
    });
  }

}
