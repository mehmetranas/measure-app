import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "./services/login.service";
import {LoginComponent} from "./login.component";
import "rxjs/add/operator/take";

@Component({
  selector: 'app-main',
  template: `
    <div class="main-body">
      <div class="container h-100 app-main">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-6">
            <div class="app-message mat-elevation-z20">
              <div class="container h-100">
                <div class="row h-100 justify-content-center align-items-center">
                  <div class="col-10">
                    <ng-container *ngIf="!isLogged && !loginCom.isPending;else logged">
                      <div fxLayout="row" fxLayoutAlign="start none" fxLayoutGap="10px">
                        <mat-icon style="color:#ffffff">lock</mat-icon>
                        <p class="text-white text-center">
                          Giriş yapmak için kullanıcı adınızı ve şifrenizi giriniz
                        </p>
                      </div>
                    </ng-container>
                    <ng-template #logged>
                      <ng-container *ngIf="((authService.navigate | async) || loginCom.isPending);else message">
                        <div fxLayout="row" fxLayoutAlign="center none" fxLayoutGap="10px">
                         <mat-icon class="spin" style="color:#ffffff">hourglass_empty</mat-icon>
                         <p class="text-white text-center">Lütfen Bekleyiniz</p>
                        </div>
                      </ng-container>
                      <ng-template #message>
                        <div fxLayout="row" fxLayoutAlign="start none" fxLayoutGap="10px">
                          <mat-icon style="color:#ffffff">lock_open</mat-icon>
                          <p class="text-white">
                            Kullanıcı girişi yapıldı. Dilerseniz <span class="text-muted">Çıkış</span> yaparak
                            oturumunuzu
                            sonlandırabilir veya <span class="text-muted">Anasayfa</span> butonu ile sayfanızı
                            açabilirsiniz.
                          </p>
                        </div>
                      </ng-template>
                    </ng-template>
                  </div>
                </div>
              </div>
            </div>
            <div class="app-login mat-elevation-z20">
              <app-login #loginComponent></app-login>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .main-body {
      height: 100vh;
      width: 100vw;
      background: linear-gradient(to right, #ff084c, deeppink);
      overflow: auto;
    }

    .app-login {
      height: auto;
      padding: 45px 15px;
      background-color: white;
    }

    .app-message {
      height: auto;
      padding: 45px 15px;
      background-color: #530972;
    }
  `]
})
export class MainComponent implements OnInit {
  @ViewChild('loginComponent') loginCom: LoginComponent;
  constructor(public authService:AuthService) { }

  ngOnInit() {
    if(!this.authService.user$ && localStorage.getItem('xAuthToken') !== null)
      this.authService.checkSession()
        .take(1)
        .subscribe();
  }
  get isLogged(): boolean {
    return localStorage.getItem('xAuthToken') !== null;
  }
}
