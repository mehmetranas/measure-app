import { Component, OnInit } from '@angular/core';
import {NgRedux} from '@angular-redux/store';
import {ISidenavState} from '../sidenav.state';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private ngReduxSidenav: NgRedux<ISidenavState>) {}

  ngOnInit() {
  }

  public toggleSidenav() {
    this.ngReduxSidenav.dispatch( {type: ''} );
  }
}
