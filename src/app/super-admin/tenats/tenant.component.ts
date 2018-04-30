import {AfterViewInit, ChangeDetectorRef, Component, OnInit, Output} from '@angular/core';
import {TenantService} from "../services/tenant.service";
import {TenantModel} from "../models/tenant.model";
import {MatSnackBar} from "@angular/material";
import {Router} from "@angular/router";
import {UserModel} from "../../models/user.model";

@Component({
  selector: 'app-tenant',
  template: `
    <ng-container *ngIf="tenant">
      <app-tenants-list [tenants]="[tenant]" [isSingleRow]="true"></app-tenants-list>
      <hr>
      <app-user-list [users]="tenant.users"></app-user-list>
      <hr>
       <button class="btn btn-primary btn-sm ml-5" routerLink="/super"><span class="fa fa-chevron-circle-left">
       </span>&nbsp;Geri</button>
    </ng-container>
  `,
  styles: []
})
export class TenantComponent implements OnInit {
  public tenant:TenantModel;
  public users:UserModel[];

  constructor(private tenantService:TenantService,private snackBar:MatSnackBar,private router:Router) { }

  ngOnInit() {
    this.tenant = this.tenantService.tenantForDetail;
    if(!this.tenant){
      this.router.navigate(['super'])
    }
  }
}
