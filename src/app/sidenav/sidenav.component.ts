import {Component, OnInit, Output} from '@angular/core';
import {select} from '@angular-redux/store';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {AuthService} from "../auth/services/login.service";
import {MessageModel} from "../models/message.model";
import {MessagingService} from "../messaging.service";
import {Observable} from "rxjs/Observable";

const SMALL_WIDTH_BEAKPOINT = 720;
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Output() messages$: Observable<MessageModel[]>;
  @select((state) => state.sidenav.isDisplay) isDisplay;

  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BEAKPOINT}px)`);

  constructor(private dialog: MatDialog, private router: Router, private authService: AuthService, private messageService: MessagingService) {}

  ngOnInit() {
       this.messages$ = this.messageService.getAdminMessages()
        .take(1);
  }

  get isScreenSmall(){
    return this.mediaMatcher.matches;
  }

  public newCustomer() {
    this.router.navigate(["dashboard/new-customer"])
  }

  get isAdmin(): boolean {
    return this.authService.user.role === "r1";
  }
}
