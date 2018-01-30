import { Component, OnInit } from '@angular/core';
import {NgRedux, select} from '@angular-redux/store';
import {ISidenavState} from '../sidenav.state';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @select() isDisplay;
  constructor(ngReduxSidenav: NgRedux<ISidenavState>) {
  }

  ngOnInit() {
  }
}
