import { Component } from '@angular/core';
import {UserModel} from '../models/user.model';
import {AuthService} from './services/login.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatSnackBar} from '@angular/material';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/take';
import {SendMailAddressComponent} from "../dialogs/send-mail-address.component";

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
          <form #loginForm="ngForm">
            <div class="form-container">
              <mat-form-field>
                <input matInput type="text" name="username" [(ngModel)]="user.username" required
                       placeholder="Kullanıcı Adı">
              </mat-form-field>
              <mat-form-field>
                <input matInput type="password" name="password" [(ngModel)]="user.password" required
                       placeholder="Şifre">
              </mat-form-field>
            </div>
            <div fxLayout="row" fxLayoutAlign="space-evenly center">
              <button mat-button type="button" color="primary" tabindex="-1"
                      (click)="forgetPassword()">Şifremi Unuttum
              </button>
              <button mat-raised-button type="button"
                      [disabled]="loginForm.invalid" color="primary"
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
                          [routerLink]="(authService.userRole$ | async) === 'r1' 
                          || (authService.userRole$ | async) === 'r2' ? '/user':'/tailor'">
                    <span>Ana Sayfa</span>
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
  public isPending: boolean;
  constructor(public authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private dialog:MatDialog,
              private snackBar: MatSnackBar) { }

  get isLogged(): boolean {
    return localStorage.getItem('xAuthToken') !== null;
  }

  public login() {
    this.isPending = true;
    localStorage.clear();
    this.authService
      .sendCredential(this.user.username, this.user.password)
      .take(1)
      .finally(() => this.isPending = false)
      .subscribe((role: string) => {
          const url = this.route.snapshot.queryParams['url'];
          if (url) {
            this.router.navigateByUrl(url);
          } else if (role === 'r3') {
            this.router.navigate(['tailor']);
          } else if (role === 'r1' || role === 'r2') { this.router.navigate(['user']); }
          this.snackBar.open('Giriş başarılı', 'Hoşgeldiniz', {duration: 3000});
        });
  }

  public forgetPassword(){
    this.dialog.open(SendMailAddressComponent)
  }

  public logout() {
    this.authService.logout()
      .take(1)
      .subscribe((res: any) => {
          console.log('Successfully logout', res);
        },
      );
  }
}
