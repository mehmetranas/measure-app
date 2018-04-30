import {Component, OnInit, Output} from '@angular/core';
import {TenantService} from "../services/tenant.service";
import {TenantModel} from "../models/tenant.model";

@Component({
  selector: 'app-tenant',
  template: `
    <ng-container *ngIf="tenant">
      <app-tenants-list [tenants]="[tenant]" [isSingleRow]="true"></app-tenants-list>
    </ng-container>
  `,
  styles: []
})
export class TenantComponent implements OnInit {

  @Output() tenant:TenantModel;
  constructor(private tenantService:TenantService) { }

  ngOnInit() {
    this.tenant = this.tenantService.tenantForDetail;
  }

}
