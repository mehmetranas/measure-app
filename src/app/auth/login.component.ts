import { Component, OnInit } from '@angular/core';
import {IAppState} from '../redux/stores/app.store';
import {UserModel} from '../models/user.model';
import {Subscription} from 'rxjs/Subscription';
import {AuthService} from '../user/services/login.service';
import {Router} from '@angular/router';
import {NgRedux, select} from '@angular-redux/store';
import {ADD_USER} from '../redux/redux.actions';
import {MatSnackBar} from '@angular/material';
import 'rxjs/add/operator/finally';

@Component({
  selector: 'app-login',
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-4 offset-2">
          <form class="example-form">
            <div class="form-container">
              <mat-form-field>
                <input matInput type="text" name="username" [(ngModel)] = "user.username" placeholder="Kullanıcı Adı">
              </mat-form-field>
              <mat-form-field>
                <input matInput type="password" name="password" [(ngModel)] = "user.password" placeholder="Şifre">
              </mat-form-field>
            </div>
            <button mat-raised-button color="primary" (click)="login()">Giriş</button>
            <button mat-raised-button color="warn" (click)="logout()">Çıkış</button>
          </form>
        </div>
      </div>
    </div>
    <ng-container *ngIf="isPending">
      <div class="container">
        <div class="row">
          <div class="col-md-4 offset-md-4">
            <p-progressSpinner></p-progressSpinner>
          </div>
        </div>
      </div>
    </ng-container>
  `,
  styles: [`
    .form-container {
    display: flex;
    flex-direction: column;
    margin-left: 2.5rem;
  }
  .form-container > * {
    width: 100%;
  }
  `]
})
export class LoginComponent implements OnInit {

  @select((s: IAppState) => s.user) user$;
  public user: UserModel = new UserModel();
  private subscriptions: Subscription[] = [];
  public isPending: boolean;
  constructor(private authService: AuthService,
              private router: Router,
              private snackBar: MatSnackBar,
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
          this.snackBar.open("Giriş başarılı","Hoşgeldiniz",{duration:3000});
          if(this.authService.redirectUrl) this.router.navigateByUrl(this.authService.redirectUrl);
          else this.router.navigate(["dashboard"])
        },
        (err) => {
          this.snackBar.open("Kullanıcı adı veya parola yanlış","Hata!",{duration:3000})
        });
    this.subscriptions.push(subscribe);
  }

  public logout(){
    const subscribe = this.authService.logout()
      .subscribe((res: any) => {
          console.log('Successfully logout', res);
          localStorage.removeItem('xAuthToken')
        },
      );
    this.subscriptions.push(subscribe);
  }

  public ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe() );
  }

}
