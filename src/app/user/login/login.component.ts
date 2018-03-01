import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgRedux, select} from '@angular-redux/store';
import {Subscription} from 'rxjs/Subscription';

import {UserModel} from '../../models/user.model';
import {AuthService} from '../services/login.service';
import {IAppState} from '../../redux/stores/app.store';
import {ADD_USER} from '../../redux/redux.actions';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  @select((s: IAppState) => s.user) user$;
  public user: UserModel = new UserModel();
  private subscriptions: Subscription[] = [];
  public isPending: boolean;
  constructor(private authService: AuthService,
              private router: Router,
              private ngRedux: NgRedux<IAppState>) { }

  public ngOnInit() {
  }

  public login(){
    this.isPending = true;
    this.ngRedux.dispatch({type: ADD_USER, user: this.user});
    const subscribe = this.authService
      .sendCredential(this.user.username, this.user.password)
      .finally(() => this.isPending = false)
      .subscribe((res: any) => {
          localStorage.setItem('xAuthToken', res.token);
          this.router.navigateByUrl('/orders');
          console.log('Successfully login',res)
        },
      (err) => console.log(err));
    this.subscriptions.push(subscribe);
  }

  public ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe() );
  }

}
