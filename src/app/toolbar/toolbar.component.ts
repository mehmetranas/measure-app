import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AuthService} from '../user/services/login.service';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';
import {UserModel} from "../models/user.model";
import {MessagingService} from "../messaging.service";
import {MessageModel} from "../models/message.model";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  @Output() toggleSidenav: EventEmitter<any> = new EventEmitter<any>();
  public user: UserModel = new UserModel();
  public messages: MessageModel[] = [];
  private subscription: Subscription = new Subscription();
  constructor(private router: Router,
              private msgService: MessagingService,
              private authService: AuthService) {}

  ngOnInit() {
    this.user = this.authService.user;
    if (this.user.role === 'r1') {
      this.msgService.startFCM()
        .subscribe((msg: any) => {
          console.log(msg)
          if (msg) {
            let message = new MessageModel(msg.data.body, msg.data.orderId, msg.data.title);
            this.messages.push(message);
          }
        })
    }
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
