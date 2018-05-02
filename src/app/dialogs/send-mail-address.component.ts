import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {ConfirmDialogComponent} from "./confirm-dialog.component";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-send-mail-address',
  template: `
    <div class="container">
      <div class="row">
        <mat-card>
          <mat-card-subtitle>Mail Adresinizi Giriniz</mat-card-subtitle>
          <mat-card-content>
            <form #form ="ngForm">
              <div class="form-group">
                <label for="exampleInputEmail1">Mail Adresi</label>
                <input type="email" class="form-control" 
                       name="mail" 
                       [(ngModel)]="mail" 
                       aria-describedby="emailHelp"
                       placeholder="ornek@ornek.com"
                       required  email>
                <small id="emailHelp" class="form-text text-muted">Mail adresinize bir doğrulama linki göndereceğiz</small>
              </div>
              <button type="button" class="btn btn-danger" matDialogClose>İptal</button>
              <button type="button" class="btn btn-primary" [disabled]="form.invalid" (click)="submitForm(form)">Gönder</button>
            </form>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: []
})
export class SendMailAddressComponent implements OnInit {
  public mail:string;
  constructor(
    public dialogRef: MatDialogRef<SendMailAddressComponent>,
    private http:HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  public submitForm(){
    if(this.mail || this.mail.trim() == '') return;

   this.dialogRef.close();
  }
}
