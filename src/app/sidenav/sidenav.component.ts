import {Component, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {MatDialog, MatSidenav} from '@angular/material';
import {Router} from '@angular/router';
import {AuthService} from "../auth/services/login.service";

const SMALL_WIDTH_BEAKPOINT = 720;
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BEAKPOINT}px)`);

  constructor(private dialog: MatDialog, private router: Router, public authService: AuthService) {}

  ngOnInit() { console.log("side nav is created")
  }

  get isScreenSmall(){
    return this.mediaMatcher.matches;
  }

  public newCustomer() {
    this.router.navigate(["dashboard/new-customer"])
  }
}
