import { Component, OnInit } from '@angular/core';
import {SuperAuthService} from "./services/super-auth.service";
import {take} from "rxjs/operators";
import {SuperSettingsComponent} from "./super-settings.component";
import {SettingsService} from "./user/settings.service";

@Component({
  selector: 'app-super-toolbar',
  template: `
    <mat-toolbar color="warn" class="mat-elevation-z8">
      <mat-toolbar-row>
        <span><button mat-icon-button routerLink="/super">
          <mat-icon>home</mat-icon>
        </button></span>
        <span>Ölçü Defteri Yönetim Paneli</span>
        <span class="fill-remaining-space"></span>
        <button mat-icon-button [matMenuTriggerFor]="menu">
          <mat-icon>account_circle</mat-icon>
        </button>
        <mat-menu #menu="matMenu">
          <button mat-menu-item routerLink="/super/settings">
            <mat-icon class="app-no-margin">settings</mat-icon>
            <span>Ayarlar</span>
          </button>
          <button mat-menu-item (click)="logout()">
            <mat-icon class="app-no-margin">exit_to_app</mat-icon>
            <span>Çıkış</span>
          </button>
        </mat-menu>
      </mat-toolbar-row>
    </mat-toolbar>
  `,
  styles: []
})
export class ToolbarComponent implements OnInit {

  constructor(private authService:SuperAuthService) { }

  ngOnInit() {}

  public logout(){
    this.authService.logout()
      .pipe(
        take(1)
      )
      .subscribe(() => console.log('Logout success'));
  }

}
