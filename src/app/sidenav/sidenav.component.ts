import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {AuthService} from "../auth/services/login.service";
import {MessagingService} from "../messaging.service";
import {take} from "rxjs/operators";

const SMALL_WIDTH_BEAKPOINT = 720;
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  providers:[MessagingService]
})
export class SidenavComponent implements OnInit{
  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BEAKPOINT}px)`);

  constructor(private dialog: MatDialog, private router: Router, public authService: AuthService) {}

  ngOnInit(){
    this.authService.getUser()
      .pipe(
        take(1)
      )
      .subscribe()
  }

  get isScreenSmall(){
    return this.mediaMatcher.matches;
  }

  public newCustomer() {
    this.router.navigate(["/user/new-customer"])
  }
}
