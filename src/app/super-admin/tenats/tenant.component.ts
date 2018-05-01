import {AfterViewInit, ChangeDetectorRef, Component, OnInit, Output} from '@angular/core';
import {TenantService} from "../services/tenant.service";
import {TenantModel} from "../models/tenant.model";
import {MatSnackBar} from "@angular/material";
import {Router} from "@angular/router";
import "rxjs/add/observable/of";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Component({
  selector: 'app-tenant',
  template: `
    <ng-container *ngIf="tenants$">
      <app-tenants-list [tenants$]="tenants$" [isSingleRow]="true"></app-tenants-list>
      <hr>
      <app-user-list [tenants$]="tenants$"></app-user-list>
      <hr>
       <button class="btn btn-primary btn-sm ml-5 mb-4" routerLink="/super"><span class="fa fa-chevron-circle-left">
       </span>&nbsp;Geri</button>
    </ng-container>
  `,
  styles: []
})
export class TenantComponent implements OnInit {
  public tenants$:BehaviorSubject<TenantModel[]>;

  constructor(private tenantService:TenantService,private snackBar:MatSnackBar,private router:Router) { }

  ngOnInit() {
    if(this.tenantService.tenantsForDetail$.getValue() == null) this.router.navigate(['super']);
    else this.tenants$ = this.tenantService.tenantsForDetail$;
  }}
