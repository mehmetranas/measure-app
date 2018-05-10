import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {finalize, take} from "rxjs/operators";
import {Router} from "@angular/router";
import {SkipInterceptor} from "../helpers";

@Component({
  selector: 'app-send-mail-address',
  template: `
    <div class="container">
      <div class="row">
        <ng-template #pending>
          <div fxLayout="row" fxLayoutAlign="center center">
            <mat-spinner [diameter]="30"></mat-spinner>
          </div>
        </ng-template>
        <ng-container *ngIf="!isPending;else pending">
          <mat-card>
            <mat-card-subtitle>Mail Adresinizi Giriniz</mat-card-subtitle>
            <mat-card-content>
              <ng-container *ngIf="!displayMessage;else message">
                <form #form ="ngForm">
                  <div class="form-group">
                    <input type="email" class="form-control"
                           name="mail"
                           [(ngModel)]="mail"
                           aria-describedby="emailHelp"
                           placeholder="ornek@ornek.com"
                           required  email>
                    <small id="emailHelp" class="form-text text-muted">Mail adresinize bir doğrulama linki göndereceğiz</small>
                  </div>
                  <button type="button" class="btn btn-danger" matDialogClose>İptal</button>
                  <button type="button" class="btn btn-primary" [disabled]="form.invalid" (click)="submitForm()">Gönder</button>
                </form>
              </ng-container>
              <ng-template #message>
                <div fxLayout="column" fxLayoutAlign="center center">
                  <p>
                    Mail adresinize bir bağlantı linki gönderdik lütfen mailinize gidip size gelen linki açın
                  </p>
                </div>
              </ng-template>
            </mat-card-content>
          </mat-card>
        </ng-container>
      </div>
    </div>
  `,
  styles: []
})
export class SendMailAddressComponent implements OnInit {
  public mail:string;
  public isPending = false;
  public displayMessage = false;
  constructor(
    public dialogRef: MatDialogRef<SendMailAddressComponent>,
    private http:HttpClient,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  public submitForm(){
    if(!this.mail || this.mail.trim() == '') return;
    this.isPending = true;
    this.http.post('http://167.99.81.86:8181/user/forget-password',{'email':this.mail})
      .pipe(
        take(1),
        finalize(() => this.isPending = false)
      )
      .subscribe(() => {
         this.showMessage()
      });
  }

  private showMessage() {
    this.displayMessage = true;
    setTimeout(() => {
      this.dialogRef.close();
    },6000)
  }
}
