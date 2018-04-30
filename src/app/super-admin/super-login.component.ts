import { Component, OnInit } from '@angular/core';
import {SuperAuthService} from "./services/super-auth.service";
import {finalize, take} from "rxjs/operators";
import {MatSnackBar} from "@angular/material";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-super-login',
  template: `
  <div class="main" fxLayout="column" fxLayoutAlign="center center">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6 offset-md-3 credentials mat-elevation-z10">
            <ng-container *ngIf="(isLoad | async) || isPending;else form">
              <div fxLayout="column" fxLayoutAlign="center center">
                <mat-spinner [diameter]="25"></mat-spinner>
                <div *ngIf="isPending">
                  <br>
                  <p>Bilgileriniz Kontrol Ediliyor...</p>
                </div>
                <div *ngIf="(isLoad | async)">
                  <br>
                  <p>Sayfanız Yükleniyor...</p>
                </div>
              </div>
            </ng-container>
            <ng-template #form>
              <form>
                <fieldset [disabled]="isLogged">
                <div class="form-group">
                  <input type="email" class="form-control" name="email"
                         [(ngModel)] = "username" required
                         aria-describedby="emailHelp" placeholder="Mail">
                </div>
                <div class="form-group">
                  <input type="password" class="form-control" name="password"
                         [(ngModel)] = "password" required
                         placeholder="Şifre">
                </div>
                </fieldset>
                <ng-container *ngIf="!isLogged;else logged">
                  <button type="button" class="btn btn-primary btn-block" (click)="loginSuperAdmin()">Giriş</button>
                </ng-container>
                <ng-template #logged>
                  <div class="row">
                    <div class="col-md-6">
                      <button type="button" class="btn btn-danger btn-block" (click)="logout()">
                        <span class="fa fa-sign-out"></span>
                        Çıkış</button>
                    </div>
                    <div class="col-md-6">
                      <button type="button" class="btn btn-success btn-block" routerLink="/super/tenants">
                        <span class="fa fa-home"></span>
                        Ana Sayfa</button>
                    </div>
                  </div>
                </ng-template>
              </form>
            </ng-template>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .main{
      height: 100vh;
      width: 100vw;
      background: linear-gradient(to right, #48b524e3, #0f6400);
      overflow: auto;
    }
    
    .credentials{
      background: white;
      padding: 45px;
      border-radius: 10px;
    }
  `]
})
export class SuperLoginComponent implements OnInit {
  public username:string;
  public password:string;
  public isPending = false;
  public isLoad:Observable<boolean>;

  constructor(private authService: SuperAuthService,private snackBar:MatSnackBar,private router:Router) { }

  ngOnInit() {
    this.isLoad = this.authService.isLoad$;
    this.isLoad.subscribe((data) => console.log("isLoad:",data)) // will delete

    if (this.authService.userRole$.getValue() === null && localStorage.getItem('xAuthToken') !== null) {
      this.authService.checkSession()
        .take(1)
        .subscribe();
    }
  }

  public loginSuperAdmin() {
    localStorage.clear();
    this.isPending = true;
    this.authService.login(this.username,this.password)
      .pipe(
        finalize(() => this.isPending = false),
        take(1)
      )
      .subscribe((role: string) => {
          if(role === 'r0')
            this.router.navigate(['/super']);
        },
        (err) => {
          if (err && err.status === 401) {
            this.snackBar.open('Girdiğiniz mail adresi veya şifre hatalı', 'Hata', {duration: 3000});
          }
        });
  }

  get isLogged(): boolean {
    return localStorage.getItem('xAuthToken') !== null;
  }

  public logout(){
    this.authService.logout()
      .take(1)
      .subscribe(() => console.log("Logout success"))
  }
}
