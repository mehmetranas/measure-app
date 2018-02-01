import { Component, OnInit } from '@angular/core';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../app.store';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private ngRedux: NgRedux<IAppState>) {}

  ngOnInit() {
  }

  public toggleSidenav() {
    this.ngRedux.dispatch( {type: 'HIDE_SIDENAV'});
  }
}
