import {Component, OnInit, ViewChild} from '@angular/core';
import {UserModel} from "../models/user.model";
import {AuthService} from "../auth/services/login.service";
import {MatDialog, MatTab, MatTabGroup} from "@angular/material";
import {SettingsService} from "./settings.service";
import "rxjs/add/operator/take";
import {CompanyModel} from "../models/company.model";
import {CompanySettingsComponent} from "./company-settings.component";
import {UserSettingsComponent} from "./user-settings.component";

@Component({
  selector: 'app-settings',
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <mat-card>
            <mat-card-content>
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
  @ViewChild("matTab") matTab:MatTabGroup;

  constructor(public authService:AuthService) { }

  ngOnInit() {
    this.user = this.authService.user;
    this.company = this.authService.company;
  }
}
