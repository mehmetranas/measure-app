import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PasswordValidators} from "./helpers/password.validators";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {SkipInterceptor} from "./helpers";

@Component({
  selector: 'app-refresh-password',
  template: `
    <div class="container jumbotron">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <ng-container>
            <mat-card>
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
                  <button type="button" class="btn btn-primary" [disabled]="form.invalid" (click)="submitForm()">Tamam</button>
                </form>
              </mat-card-content>
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
  constructor(private http:HttpClient, private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.sessionId = this.route.snapshot.queryParams['sessionId'];
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
    const encodedData = btoa(this.mail + ':' + this.password);
    const basicHeader = 'Basic ' + encodedData;
    const headers = new HttpHeaders()
      .set(SkipInterceptor,'')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('new-password', basicHeader)
      .set('x-auth-token', this.sessionId);
    return this.http.put("", {}, {headers: headers});
  }
}
