import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgRedux, select} from '@angular-redux/store';
import {Subscription} from 'rxjs/Subscription';

import {UserModel} from '../../models/user.model';
import {AuthService} from '../services/login.service';
import {IAppState} from '../../redux/stores/app.store';
import {ADD_USER} from '../../redux/redux.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  @select((s: IAppState) => s.user) user$;
  public user: UserModel = new UserModel();
  private subscriptions: Subscription[] = [];
  constructor(private authService: AuthService, private ngRedux: NgRedux<IAppState>) { }

  public ngOnInit() {
  }

  public login(){
    this.ngRedux.dispatch({type: ADD_USER, user: this.user});
    const subscribe = this.authService
      .sendCredential(this.user.username, this.user.password)
      .subscribe((res: any) => {
          localStorage.setItem('xAuthToken', res.token)
        },
      (err) => console.log(err));
    this.subscriptions.push(subscribe);
  }

  public logout(){
    const subscribe = this.authService.logout()
      .subscribe((res: any) => {
        console.log('Success logout', res);
        localStorage.removeItem('xAuthToken')
      },
        );
    this.subscriptions.push(subscribe);
  }

  public ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe() );
  }

}
