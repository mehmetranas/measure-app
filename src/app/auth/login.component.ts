import { Component, OnInit } from '@angular/core';
import {IAppState} from '../redux/stores/app.store';
import {UserModel} from '../models/user.model';
import {Subscription} from 'rxjs/Subscription';
import {AuthService} from '../user/services/login.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgRedux, select} from '@angular-redux/store';
import {ADD_USER} from '../redux/redux.actions';
import {MatSnackBar} from '@angular/material';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-login',
  template: `
    
    <div class="container">
      <div class="row vertical-center">
        
        <div class="col-md-4 offset-md-4">
          <form class="app-form">
            <div class="form-container">
              <mat-form-field>
                <input matInput type="text" name="username" [(ngModel)] = "user.username" placeholder="Kullanıcı Adı">
              </mat-form-field>
              <mat-form-field>
                <input matInput type="password" name="password" [(ngModel)] = "user.password" placeholder="Şifre">
              </mat-form-field>
            </div>
            <div class="button-row float-right">
              <ng-container *ngIf="!(sessionIsValid); else logoutButton">
                <button mat-raised-button class="button-row" color="primary"
                        (click)="login()">Giriş
                </button>
              </ng-container>
              <ng-template #logoutButton>
                <button mat-button class="button-row" color="primary"
                        (click)="logout()">Çıkış
                </button>
                <button mat-raised-button color="primary" routerLink="/dashboard">Ana Sayfa</button>
              </ng-template>
            </div>
          </form>
          <ng-container *ngIf="isPending">
            <div class="container">
              <div class="row">
                <div class="col-md-4 offset-md-4">
                  <p-progressSpinner></p-progressSpinner>
                </div>
              </div>
            </div>
          </ng-container>
        </div>
      </div>
    </div>
   
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
  .button-row {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .vertical-center{
    min-height: 100%;  
    min-height: 70vh; 

    display: flex;
    align-items: center;
  }
  `]
})
export class LoginComponent implements OnInit {

  @select((s: IAppState) => s.user) user$;
  public user: UserModel = new UserModel();
  private subscriptions: Subscription[] = [];
  public isPending: boolean;
  public sessionIsValid: boolean = false;
  constructor(public authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private ngRedux: NgRedux<IAppState>) { }

  public ngOnInit() {
    this.authService.checkSession()
      .take(1)
      .subscribe((value: boolean) => this.sessionIsValid = value);
  }

  public login(){
    this.isPending = true;
    const subscribe = this.authService
      .sendCredential(this.user.username, this.user.password)
      .finally(() => this.isPending = false)
      .subscribe((res: any) => {
          this.ngRedux.dispatch({type: ADD_USER, user: this.user});
          localStorage.setItem('xAuthToken', res.token);
          this.snackBar.open("Giriş başarılı","Hoşgeldiniz",{duration:3000});
          if(this.authService.redirectUrl) this.router.navigateByUrl(this.authService.redirectUrl);
          else if(this.route.snapshot.queryParams['url']) this.router.navigateByUrl(this.route.snapshot.queryParams['url']);
          else this.router.navigate(["dashboard"]);
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
          this.sessionIsValid = false;
          localStorage.removeItem('xAuthToken')
        },
      );
    this.subscriptions.push(subscribe);
  }

  public ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  public navigateHomePage() {
    this.router.navigateByUrl("/dashboard");
  }
}
