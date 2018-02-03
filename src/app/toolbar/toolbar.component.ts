import { Component, OnInit } from '@angular/core';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../redux/stores/app.store';
import {AuthService} from '../user/services/login.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  public isLogged$: Observable<any>;

  constructor(private ngRedux: NgRedux<IAppState>, private authService: AuthService) {}

  ngOnInit() {
   // this.authService.checkSession().subscribe(c => console.log(c));
  }

  public toggleSidenav() {
    this.ngRedux.dispatch( {type: 'HIDE_SIDENAV'});
  }

    isLogged() {
     return localStorage.getItem('xAuthToken') == null;
  }
}
