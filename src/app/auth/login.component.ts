import { Component } from '@angular/core';
import {UserModel} from '../models/user.model';
import {Subscription} from 'rxjs/Subscription';
import {AuthService} from './services/login.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-login',
  template: `
      <div class="login-main" fxLayout="column" fxLayoutAlign="center center">
        <ng-container *ngIf="isPending; else form">
        <div fxLayout="row" fxLayoutAlign="center center">
          <mat-spinner></mat-spinner>
        </div>
        </ng-container>
        <ng-template #form>
          <ng-container *ngIf="!isLogged; else logged">
            <form #loginForm = "ngForm">
              <div class="form-container">
                <mat-form-field>
                  <input matInput type="text" name="username" [(ngModel)]="user.userName" required
                         placeholder="Kullanıcı Adı">
                </mat-form-field>
                <mat-form-field>
                  <input matInput type="password" name="password" [(ngModel)]="user.password" required placeholder="Şifre">
                </mat-form-field>
              </div>
              <div class="button-row float-right">
                <button mat-icon-button type="button" 
                        [disabled]="loginForm.invalid"
                        class="button-row" color="primary"
                        (click)="login()">Giriş
                  <mat-icon>lock_open</mat-icon>
                </button>
              </div>
            </form>
          </ng-container>
          <ng-template #logged>
            <div class="row">
              <div class="col-md-12">
                <ng-container *ngIf="!(authService.navigate | async); else redirecting">
                  <div fxLayout="row" fxLayoutAlign="center center" fxLayoutGap="40px">
                    <button mat-icon-button type="button" color="warn"
                            (click)="logout()"><span>Çıkış</span>
                      <mat-icon>lock</mat-icon>
                    </button>
                    <button mat-icon-button type="button" color="primary"
                            [routerLink]="authService.user.role === 'r3' ? '/tailor':'/user'"><span>Ana Sayfa</span>
                      <mat-icon>home</mat-icon>
                    </button>
                  </div>
                </ng-container>
                <ng-template #redirecting>
                    Sayfanız Yükleniyor...
                    <mat-progress-bar mode="indeterminate"></mat-progress-bar>
                </ng-template>
              </div>
            </div>
          </ng-template>
        </ng-template>
      </div>
  `,
  styles: [`
    .login-main{
      height: 100%;
    }
    @media (min-width: 768px) {
        .form-container {
        margin-left: 2.5rem;
      }
    }
  .form-container > * {
    width: 100%;
  }
  .button-row {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
    .description-text{
      padding: 8%;
    }
  `]
})
export class LoginComponent {

  public user: UserModel = new UserModel();
  private subscriptions: Subscription[] = [];
  public isPending: boolean;
  constructor(public authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar) { }

  get isLogged(): boolean {
    return localStorage.getItem('xAuthToken') !== null;
  }

  public login(){
    this.isPending = true;
    const subscribe = this.authService
      .sendCredential(this.user.userName, this.user.password)
      .finally(() => this.isPending = false)
      .subscribe((res: UserModel) => {
          localStorage.setItem('xAuthToken', res.token);
          this.authService.user = res;
          this.snackBar.open("Giriş başarılı","Hoşgeldiniz",{duration:3000});
          const url = this.route.snapshot.queryParams["url"];
          if(url)
            this.router.navigateByUrl(url);
          else if(res.role === 'r3'){
            this.router.navigate(["tailor"]);
          }
          else if(res.role === 'r1' || res.role === 'r2') this.router.navigate(["user"]);
        },
        (err) => {
          this.router.navigateByUrl("auth");
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
}
