import {AfterViewInit, ChangeDetectorRef, Component, OnInit, Output} from '@angular/core';
import {TenantService} from "../services/tenant.service";
import {TenantModel} from "../models/tenant.model";
import {MatSnackBar} from "@angular/material";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tenant',
  template: `
    <ng-container *ngIf="tenant">
      <app-tenants-list [tenants]="[tenant]" [isSingleRow]="true"></app-tenants-list>
      <hr>
    </ng-container>
  `,
  styles: []
})
export class TenantComponent implements OnInit {
  public tenant:TenantModel;

  constructor(private tenantService:TenantService,private snackBar:MatSnackBar,private router:Router) { }

  ngOnInit() {
    this.tenant = this.tenantService.tenantForDetail;
    if(!this.tenant){
      this.router.navigate(['super'])
    }
  }



}
