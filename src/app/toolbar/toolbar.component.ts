import {Component, EventEmitter,  OnDestroy, OnInit, Output} from '@angular/core';
import {AuthService} from '../auth/services/login.service';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';
import {UserModel} from "../models/user.model";
import {MessagingService} from "../messaging.service";
import "rxjs/add/operator/do";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  @Output() toggleSidenav: EventEmitter<any> = new EventEmitter<any>();
  @Output() toggleNotifies: EventEmitter<any> = new EventEmitter<any>();
  public newMessage: boolean = false;
  public user: UserModel = new UserModel();
  private subscription: Subscription = new Subscription();
  private mediaMatcher: MediaQueryList = matchMedia(`(max-width:${720}px)`);
  constructor(private router: Router,
              public messageService:MessagingService,
              private authService: AuthService) {}

  ngOnInit() {
    this.user = this.authService.user;
    this.subscription = this.messageService.currentMessage
      .subscribe((data) => {
        if(data){
          this.newMessage = true;
          setTimeout(() => this.newMessage = false,3000)
        }
      });
  }

  public ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  get isScreenSmall(): boolean{
    return this.mediaMatcher.matches;
  }

  public isLogged() {
     return localStorage.getItem('xAuthToken') == null;
  }

  public logout( ){
    this.authService.logout()
      .take(1)
      .subscribe(() => {
      this.router.navigate(['auth']);
      console.log('Logout is successfully.');
    });
  }
}
