import { Component, OnInit } from '@angular/core';
import {SuperAuthService} from "./super-auth.service";
import {take} from "rxjs/operators";
import {MatSnackBar} from "@angular/material";
import {Router} from "@angular/router";

@Component({
  selector: 'app-super-login',
  template: `
  <div class="main" fxLayout="column" fxLayoutAlign="center center">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6 offset-md-3 credentials mat-elevation-z10">
            <form>
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
              <button type="button" class="btn btn-primary btn-block" (click)="loginSuperAdmin()">Giriş</button>
            </form>
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

  constructor(private authService: SuperAuthService,private snackBar:MatSnackBar,private router:Router) { }

  ngOnInit() {
  }

  public loginSuperAdmin() {
    localStorage.clear();
    this.authService.login(this.username,this.password)
      .pipe(
        take(1)
      )
      .subscribe((role: string) => {
          if(role === 'r0')
            this.router.navigate(['super/tenants']);
        },
        (err) => {debugger
          if (err && err.status === 401) {
            this.snackBar.open('Girdiğiniz mail adresi veya şifre hatalı', 'Hata', {duration: 3000});
          }
        });
  }

  get isLogged(): boolean {
    return localStorage.getItem('xAuthToken') !== null;
  }
}
