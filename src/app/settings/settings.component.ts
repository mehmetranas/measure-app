import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../auth/services/login.service';
import {MatTabGroup} from '@angular/material';
import {SettingsService} from './settings.service';

@Component({
  selector: 'app-settings',
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <mat-card class="mat-elevation-z10">
            <mat-card-content>
              <ng-container *ngIf="(authService.user$ | async);else pending">
                <mat-tab-group class="app-tab-group">
                  <mat-tab label="Kullanıcı">
                    <div class="app-tab">
                      <app-user-settings [user]="authService.user$ | async"></app-user-settings>
                    </div>
                  </mat-tab>
                  <mat-tab *ngIf="(authService.company$) && (authService.userRole$ | async) === 'r1'" label="Şirket">
                    <div class="app-tab">
                      <app-company-settings [company]="authService.company$ | async"></app-company-settings>
                    </div>
                  </mat-tab>
                </mat-tab-group>
              </ng-container>
              <ng-template #pending>
                <div fxLayout="column" fxLayoutAlign="center center">
                  <mat-spinner [diameter]="25"></mat-spinner>
                </div>
              </ng-template>
            </mat-card-content>
          </mat-card>
        </div>
      </div>
    </div>

  `,
  styles: [`
  `],
  providers: [SettingsService]
})
export class SettingsComponent implements OnInit {
  public isPending = false;
  @ViewChild('matTab') matTab: MatTabGroup;

  constructor(public authService: AuthService) { }

  ngOnInit() {}
}
