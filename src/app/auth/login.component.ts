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
      <div class="row">
        <div class="col-md-10 vertical-center">
          <ng-container *ngIf="isPending; else form">
            <div class="container">
              <div class="row">
                <div class="col-md-4 offset-md-4">
                  <p-progressSpinner></p-progressSpinner>
                </div>
              </div>
            </div>
          </ng-container>
          <ng-template #form>
            <ng-container *ngIf="!isLogged; else logged">
              <form class="app-form">
                <div class="form-container">
                  <mat-form-field>
                    <input matInput type="text" name="username" [(ngModel)]="user.userName" placeholder="Kullanıcı Adı">
                  </mat-form-field>
                  <mat-form-field>
                    <input matInput type="password" name="password" [(ngModel)]="user.password" placeholder="Şifre">
                  </mat-form-field>
                </div>
                <div class="button-row float-right">
                  <button mat-raised-button type="button" class="button-row" color="primary"
                          (click)="login()">Giriş
                  </button>
                </div>
              </form>
            </ng-container>
            <ng-template #logged>
              <div class="row">
                <div class="col-md-12">
                  <div fxLayout="column" fxLayoutAlign="center center">
                    <ng-container *ngIf="!(authService.navigate | async); else redirecting">
                      <div fxLayout="row" fxLayoutAlign="center center">
                        <button mat-button type="button" color="primary"
                                (click)="logout()">Çıkış
                        </button>
                        <button mat-raised-button type="button" color="primary"
                                [routerLink]="role === 'r3' ? '/tailor':'/dashboard'">Ana Sayfa
                        </button>
                      </div>
                      <div class="description-text" fxFlexAlign="end">
                        <p>
                          Kullanıcı girişi yapıldı. Dilerseniz <span class="text-muted">Çıkış</span> yaparak oturumunuzu
                          sonlandırabilir veya <span class="text-muted">Anasayfa</span> butonu ile sayfanızı
                          açabilirsiniz.
                        </p>
                      </div>
                    </ng-container>
                    <ng-template #redirecting>
                      Yönlendiriliyorsunuz...
                      <mat-progress-bar mode="indeterminate"></mat-progress-bar>
                    </ng-template>
                  </div>
                </div>
              </div>
            </ng-template>
          </ng-template>
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
   margin-top: 15%;
  }
    .description-text{
      margin: 18% 0 0 18%;
    }
  `]
})
export class LoginComponent implements OnInit {

  @select((s: IAppState) => s.user) user$;
  public user: UserModel = new UserModel();
  private subscriptions: Subscription[] = [];
  public isPending: boolean;
  constructor(public authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private ngRedux: NgRedux<IAppState>) { }

  public ngOnInit() {
  }

  get isLogged(): boolean {
    return localStorage.getItem('xAuthToken') !== null;
  }

  get role(){
    return this.authService.user.role;
  }

  public login(){
    this.isPending = true;
    const subscribe = this.authService
      .sendCredential(this.user.userName, this.user.password)
      .finally(() => this.isPending = false)
      .subscribe((res: UserModel) => {
          this.ngRedux.dispatch({type: ADD_USER, user: this.user});
          localStorage.setItem('xAuthToken', res.token);

          this.authService.user = res;
          this.snackBar.open("Giriş başarılı","Hoşgeldiniz",{duration:3000});
          if(res.role === 'r3'){
            this.router.navigate(["tailor"]);
          }
          else if(res.role === 'r1' || res.role === 'r2') this.router.navigate(["dashboard"]);
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
