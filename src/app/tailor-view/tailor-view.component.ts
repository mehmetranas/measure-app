import {Component, OnInit, Output} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {AuthService} from "../auth/services/login.service";
import {UserModel} from "../models/user.model";
import {MessagingService} from "../messaging.service";
import {MessageModel} from "../models/message.model";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-tailor-view',
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav mode="over"
                   class="notify-sidenav mat-elevation-z6"
                   position="end"
                   [opened]="'false'"
                   [fixedInViewport]="false"  #notifySideNav>
        <mat-nav-list>
          <app-notifications *ngIf="(authService.user$ | async).role === 'r3'" (closeSidenav)="notifySideNav.close()"></app-notifications>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <div class="content">
          <app-toolbar (toggleNotifies)="notifySideNav.toggle()"></app-toolbar>
          <div class="order-list">
            <router-outlet></router-outlet>
          </div>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styleUrls: ['./tailor-view.component.css'],
  providers: [MessagingService]
})
export class TailorViewComponent implements OnInit {

  @Output() messages$: Observable<MessageModel[]>;
  constructor(public authService: AuthService) { }

  ngOnInit() {}
}
