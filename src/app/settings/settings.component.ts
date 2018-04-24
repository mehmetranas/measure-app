import {Component, OnInit, ViewChild} from '@angular/core';
import {UserModel} from "../models/user.model";
import {AuthService} from "../auth/services/login.service";
import {MatTabGroup} from "@angular/material";
import {SettingsService} from "./settings.service";
import {CompanyModel} from "../models/company.model";
import {finalize} from 'rxjs/operators/finalize';
import {take} from "rxjs/operators";

@Component({
  selector: 'app-settings',
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <mat-card>
            <mat-card-content>
              <ng-container *ngIf="!isPending;else pending">
                <mat-tab-group class="app-tab-group">
                  <mat-tab *ngIf="user" label="Kullanıcı">
                    <div class="app-tab">
                      <app-user-settings [user]="user" [isEdit]="isEdit"></app-user-settings>
                    </div>
                  </mat-tab>
                  <mat-tab *ngIf="company && authService.user.role === 'r1'" label="Şirket">
                    <div class="app-tab">
                      <app-company-settings [company]="company" [isEdit]="isEdit"></app-company-settings>
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
  public user: UserModel;
  public company: CompanyModel;
  public isEdit:boolean = false;
  public isPending = false;
  @ViewChild("matTab") matTab:MatTabGroup;

  constructor(public authService:AuthService) { }

  ngOnInit() {
    this.isPending = true;
    this.authService.getUser()
      .pipe(
        finalize(() => this.isPending = false),
        take(1)
      )
      .subscribe((user: UserModel) => {
        this.user = user;
        console.log(this.user)
      });
  }
}
