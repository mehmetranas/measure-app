import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../redux/stores/app.store';
import {AuthService} from '../user/services/login.service';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy {

  public isLogged$: Observable<any>;
  private subscription: Subscription = new Subscription();

  constructor(private ngRedux: NgRedux<IAppState>,
              private router: Router,
              private authService: AuthService) {}

  ngOnInit() {
   // this.authService.checkSession().subscribe(c => console.log(c));
  }

  public ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  public toggleSidenav() {
    this.ngRedux.dispatch( {type: 'HIDE_SIDENAV'});
  }

  public isLogged() {
     return localStorage.getItem('xAuthToken') == null;
  }

  public logout( ){
    this.subscription = this.authService.logout().subscribe(() => {
      localStorage.removeItem('xAuthToken');
      this.router.navigate(['login']);
      console.log('Logout is successfully.');
    });
  }
}
