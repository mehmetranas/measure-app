import {Component, OnInit, ViewChild} from '@angular/core';
import {UserModel} from "../models/user.model";
import {AuthService} from "../auth/services/login.service";
import {MatDialog, MatTab, MatTabGroup} from "@angular/material";
import {SettingsService} from "./settings.service";
import "rxjs/add/operator/take";
import {CompanyModel} from "../models/company.model";

@Component({
  selector: 'app-settings',
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <mat-card>
            <mat-card-content>
              <mat-tab-group class="app-tab-group" (selectedTabChange)="tabChanged($event)" #matTab>
                <mat-tab label="Kullanıcı">
                  <div class="app-tab">
                    <app-user-settings [user]="user" [isEdit]="isEdit"></app-user-settings>
                  </div>
                </mat-tab>
                <mat-tab label="Şirket">
                  <div class="app-tab">
                    <app-company-settings [company]="company" [isEdit]="isEdit"></app-company-settings>
                  </div>
                </mat-tab>
              </mat-tab-group>
            </mat-card-content>
            <mat-card-actions>
              <div fxLayout="row" fxFlexOffset="70" fxLayoutAlign="none center">
                <ng-container *ngIf="!isEdit;else save">
                  <button mat-icon-button color="accent" type="button" (click)="editUser()"><span>Düzenle</span>
                    <mat-icon class="app-sm-icon">mode_edit</mat-icon>
                  </button>
                </ng-container>
                <ng-template #save>
                  <div fxLayout="row" fxLayoutGap="20px">
                    <button mat-icon-button color="warn" (click)="isEdit=false"><span>İptal</span>
                      <mat-icon class="app-sm-icon">cancel</mat-icon>
                    </button>
                    <button mat-icon-button color="primary" (click)="saveModel()"><span>Kaydet</span>
                      <mat-icon class="app-sm-icon">save</mat-icon>
                    </button>
                  </div>
                </ng-template>
              </div>
            </mat-card-actions>
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
  public tabIndex:number; //update user or company determine via this property;
  public isEdit:boolean = false;
  @ViewChild("matTab") matTab:MatTabGroup;

  constructor(private authService:AuthService,private settingsService:SettingsService,private dialog:MatDialog) { }

  ngOnInit() {
    this.user = new UserModel(this.authService.user.userName,this.authService.user.surname,this.authService.user.email,this.authService.user.phone);
    this.company = new CompanyModel(this.authService.user.companyName,this.authService.user.companyPhone,this.authService.user.companyMail,this.authService.user.companyAddress);
    this.tabIndex = this.matTab.selectedIndex;
  }

  public editUser(){
    this.isEdit = true;
  }

  public saveModel(){
    this.isEdit = false;
    if(this.tabIndex === 0){
      if(!this.user) return;
      this.settingsService.updateUser(this.user)
        .take(1)
        .subscribe()
    }else if(this.tabIndex === 1){
      this.settingsService.updateCompany(this.company)
        .take(1)
        .subscribe()
    }
  }

  public tabChanged(event) {
    console.log("matTabEvent",event)
  }
}
