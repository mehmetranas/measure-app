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
  constructor(private authService: AuthService, private router: Router, private messageService:MessagingService) { }

  ngOnInit() {
    this.user = this.authService.user;
  }

  public ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
