import { Component, OnInit } from '@angular/core';
import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '../redux/stores/app.store';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @select((state) => state.sidenav.isDisplay) isDisplay;
  constructor(ngRedux: NgRedux<IAppState>) {}

  ngOnInit() {
  }
}
