import { Component, OnInit } from '@angular/core';
import {SuperAuthService} from "./services/super-auth.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-super-toolbar',
  template: `
    <mat-toolbar color="primary" class="mat-elevation-z8">
      <mat-toolbar-row>
        <span>Ölçü Defteri Yönetim Paneli</span>
        <span class="fill-remaining-space"></span>
        <button mat-icon-button [matMenuTriggerFor]="menu">
          <mat-icon>account_circle</mat-icon>
        </button>
        <mat-menu #menu="matMenu">
          <button mat-menu-item>Ayarlar</button>
          <button mat-menu-item (click)="logout()">Çıkış</button>
        </mat-menu>
      </mat-toolbar-row>
    </mat-toolbar>
  `,
  styles: []
})
export class ToolbarComponent implements OnInit {

  constructor(private authService:SuperAuthService) { }

  ngOnInit() {
  }

  public logout(){
    this.authService.logout()
      .pipe(
        take(1)
      )
      .subscribe(() => console.log('Logout success'));
  }

}
