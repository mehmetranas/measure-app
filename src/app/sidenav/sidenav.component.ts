import { Component, OnInit } from '@angular/core';
import {select} from '@angular-redux/store';
import {MatDialog} from '@angular/material';
import {CustomerAddComponent} from '../dialogs/customer-add.component';
import {Router} from '@angular/router';

const SMALL_WIDTH_BEAKPOINT = 720;
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @select((state) => state.sidenav.isDisplay) isDisplay;
  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BEAKPOINT}px)`);
  constructor(private dialog: MatDialog, private router: Router) {}

  ngOnInit() {
  }

  get isScreenSmall(){
    return this.mediaMatcher.matches;
  }

  public newCustomer() {
    this.router.navigate(["dashboard/new-customer"])
  }
}
