import {Component, OnInit, Output} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {AuthService} from "../auth/services/login.service";
import {Router} from "@angular/router";
import {UserModel} from "../models/user.model";
import {MessagingService} from "../messaging.service";
import {MessageModel} from "../models/message.model";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-tailor-view',
  templateUrl: './tailor-view.component.html',
  styleUrls: ['./tailor-view.component.css']
})
export class TailorViewComponent implements OnInit {

  @Output() messages$: Observable<MessageModel[]>;
  public user:UserModel = new UserModel();
  public subscription = new Subscription();
  private mediaMatcher: MediaQueryList = matchMedia(`(max-width:${720}px)`);
  constructor(private authService: AuthService, private router: Router, private messageService:MessagingService) { }

  ngOnInit() {
    this.user = this.authService.user;
    // this.messages$ = this.messageService.getTailorMessages()
    //   .take(1);
    // this.subscription = this.messageService.startFCM()
    //   .subscribe((msg: any) => {
    //   console.log(msg);
    //   if(msg){
    //     // let message = new MessageModel(msg.data.body,msg.data.orderId,msg.data.title);
    //     // this.messages.push(message);
    //   }
    // })
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
