import {Component, EventEmitter,  OnDestroy, OnInit, Output} from '@angular/core';
import {AuthService} from '../auth/services/login.service';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';
import {UserModel} from "../models/user.model";
import {MessagingService} from "../messaging.service";
import {MatToolbar} from "@angular/material";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  @Output() toggleSidenav: EventEmitter<any> = new EventEmitter<any>();
  @Output() toggleNotifies: EventEmitter<any> = new EventEmitter<any>();
  public user: UserModel = new UserModel();
  private subscription: Subscription = new Subscription();
  private mediaMatcher: MediaQueryList = matchMedia(`(max-width:${720}px)`);
  constructor(private router: Router,
              public messageService:MessagingService,
              private authService: AuthService) {}

  ngOnInit() {
    this.user = this.authService.user;
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
    this.subscription = this.authService.logout().subscribe(() => {
      this.router.navigate(['auth']);
      console.log('Logout is successfully.');
    });
  }
}
