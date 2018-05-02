import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PasswordValidators} from "./helpers/password.validators";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {SkipInterceptor} from "./helpers";
import {finalize, take} from "rxjs/operators";
import {MatDialog} from "@angular/material";
import {SendMailAddressComponent} from "./dialogs/send-mail-address.component";

@Component({
  selector: 'app-refresh-password',
  template: `
    <div class="container jumbotron">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <ng-template #pending>
            <div fxLayout="row" fxLayoutAlign="center center">
              <mat-spinner [diameter]="30"></mat-spinner>
            </div>
          </ng-template>
          <ng-container *ngIf="!isPending;else pending">
            <mat-card>
              <ng-container *ngIf="!displayMessage;else message">
                <mat-card-subtitle>Yeni Şifrenizi Giriniz</mat-card-subtitle>
                <mat-card-content>
                  <form [formGroup]="form">
                    <label for="mail">Mail Adresi</label>
                    <div class="form-group">
                      <input type="email" class="form-control" name="mail" email [(ngModel)]="mail" formControlName="mail" placeholder="Mail">
                    </div>
                    <div class="form-group">
                      <label for="password">Yeni Şifre</label>
                      <input type="password" class="form-control" name="newPassword" [(ngModel)]="password" formControlName="newPassword" placeholder="Yeni Şifre">
                    </div>
                    <div class="form-group">
                      <label for="confirm">Şifre Tekrar</label>
                      <input type="password" class="form-control" name="confirmPassword" [(ngModel)]="confirmPassword" formControlName="confirmPassword" placeholder="Yeni Şifre Tekrar">
                    </div>
                    <div fxLayout="row" fxLayoutAlign="space-between center">
                      <button mat-button type="button" color="accent" (click)="retryMail()">Yeni İstek Gönder</button>
                      <button type="button" class="btn btn-primary" [disabled]="form.invalid" (click)="submitForm()">Tamam</button>
                    </div>
                  </form>
                </mat-card-content>
              </ng-container>
              <ng-template #message>
                <div fxLayout="column" fxLayoutAlign="center center">
                  <p>
                    Yeni şifreniz oluşturuldu. Şimdi giriş ekrenına yönlendirileceksiniz
                  </p>
                  <span class="text-muted">
                    {{ timer }}
                  </span>
                  <button mat-raised-button routerLink="/auth" color="primary">
                    <span>Giriş Yap</span>
                  </button>
                </div>
              </ng-template>
            </mat-card>
          </ng-container>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class RefreshPasswordComponent implements OnInit {

  public mail:string;
  public password:string;
  public confirmPassword:string;
  public form:FormGroup;
  private sessionId:string;
  public isPending = false;
  public displayMessage =false;
  public timer = 6;
  constructor(private http:HttpClient, private route:ActivatedRoute,private dialog:MatDialog,private router:Router) { }

  ngOnInit() {
    this.sessionId = this.route.snapshot.queryParams['token'];
    if(!this.sessionId || this.sessionId.trim() == '') {
      this.router.navigate(['auth']);
      return;
    }

    this.form = new FormGroup({
      mail:new FormControl('',Validators.required),
      newPassword:new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(10)]),
      confirmPassword:new FormControl('',Validators.required)
    },PasswordValidators.shouldMatch);
  }

  public submitForm(){
    this.isPending = true;
    const encodedData = btoa(this.mail + ':' + this.password);
    const basicHeader = 'Basic ' + encodedData;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('new-password', basicHeader)
      .set('reset-password-token', this.sessionId);
    return this.http.post('https://measure-notebook-api.herokuapp.com/user/reset-password', {}, {headers: headers})
      .pipe(
        take(1),
        finalize(() => this.isPending = false)
      )
      .subscribe(() => {
        this.showMessage();
      });
  }

  private showMessage() {
    this.displayMessage = true;
    const intervalRef = setInterval(() => this.timer--,1000);
    setTimeout(() => {
      this.router.navigate(['auth']);
      clearInterval(intervalRef);
    },6000)
  }

  public retryMail() {
    this.dialog.open(SendMailAddressComponent);
  }
}
